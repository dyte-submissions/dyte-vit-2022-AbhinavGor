import dotenv from "dotenv";
dotenv.config();
import { Octokit } from "@octokit/core";
import { createPullRequest } from "octokit-plugin-create-pull-request";
import Configstore from 'configstore';
import checkVersion from './checkVersion.js';
import pkg from 'enquirer';
import { Console } from "console";

const {prompt} = pkg;
const executeUpdates = async (finalRepos, packageName, requiredVersion) => {
    const config = new Configstore('github-creds');
    const {github_token} = await prompt({
        type: "password",
        name: 'github_token',
        message: 'Paste your github access token here:'
    });

    config.set({ github_token });
    console.log("Github token stored successfully!");

    const {github_username} = await prompt({
        type: "text",
        name: 'github_username',
        message: 'Enter your github username'
    });

    config.set({ github_username });
    console.log("Github username stored successfully!");

    const {github_email} = await prompt({
        type: "text",
        name: 'github_email',
        message: 'Enter your github username'
    });

    config.set({ github_email });
    console.log("Github email stored successfully!");
    const octoClient = Octokit.plugin(createPullRequest);
    const octokit = new octoClient({
        auth: github_token
    });

    const updatedRepos = [];
    finalRepos.map(async (repo) => {
        if(!repo.version_satisfied){
            const repoDetails = repo.url.split('/');
        
            //make a fork of the repo to be updated
            await octokit.request(`POST /repos/${repoDetails[3]}/${repoDetails[4]}/forks`);

            const fileDetails = await octokit.request(`GET /repos/${repoDetails[3]}/${repoDetails[4]}/contents/package.json`);
            const fileSHA = fileDetails.data.sha;
            const fileContent = fileDetails.data.content;

            const fileContentBuffer = new Buffer(fileContent, 'base64');
            const fileContentJSON = JSON.parse(fileContentBuffer.toString('ascii'));
            
            //Checks if the fork has the version of the package satisfied or not, if it is not satisfied,
            //then we make a commit with the updated version of the package.
            if(!checkVersion(fileContentJSON.dependencies[packageName], requiredVersion)){
                fileContentJSON.dependencies[packageName] = requiredVersion;

                const updatedFileBuffer = new Buffer(JSON.stringify(fileContentJSON, null, 2));
                const base64Updates = updatedFileBuffer.toString('base64');
                const commitMessage = `Chores: Update npm package ${packageName} to ${requiredVersion}.`;

                const commitDetails = {
                    owner: 'AbhinavGor',
                    repo: repoDetails[4],
                    message: commitMessage,
                    committer: {
                        name: github_username,
                        email: github_email
                    },
                    content: base64Updates,
                    sha: fileSHA
                }

                //make a commit with the changes
                // await octokit.request(`PUT /repos/AbhinavGor/${repoDetails[4]}/contents/package.json`, commitDetails);
            }

            const prDetails = {
                owner: github_username,
                repo: repoDetails[4],
                title: `Chores: Update npm package ${packageName} to ${requiredVersion}.`,
                head: github_username + ":main",
                base: 'main'
            }
            //make a PR with the updated changes
            const pullRes = await octokit.request(`POST /repos/${repoDetails[3]}/${repoDetails[4]}/pulls`, prDetails);

            const newDetails = {...repo, update_pr: pullRes.data.html_url};
            // console.log({pullRes, newDetails});
            updatedRepos.push(newDetails);

            console.table(updatedRepos);

        }else{
            updatedRepos.push({...repo});
        }
    })
    
}

export default executeUpdates;