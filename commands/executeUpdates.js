import dotenv from "dotenv";
dotenv.config();
import { Octokit } from "@octokit/core"
import { createPullRequest } from "octokit-plugin-create-pull-request"
import checkVersion from './checkVersion.js';

const executeUpdates = async (finalRepos, packageName, requiredVersion) => {
    const octoClient = Octokit.plugin(createPullRequest);
    const octokit = new octoClient({
        auth: process.env.GITHUB_TOKEN
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
                        name: process.env.USER_NAME,
                        email: process.env.USER_EMAIL
                    },
                    content: base64Updates,
                    sha: fileSHA
                }

                //make a commit with the changes
                // await octokit.request(`PUT /repos/AbhinavGor/${repoDetails[4]}/contents/package.json`, commitDetails);
            }

            const prDetails = {
                owner: 'process.env.OWNER_NAME',
                repo: repoDetails[4],
                title: `Chores: Update npm package ${packageName} to ${requiredVersion}.`,
                head: process.env.USER_NAME + ":main",
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