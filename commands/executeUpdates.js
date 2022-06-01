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
            
            if(!checkVersion(fileContentJSON.dependencies[packageName], requiredVersion)){
                fileContentJSON.dependencies[packageName] = requiredVersion;

                const updatedFileBuffer = new Buffer(JSON.stringify(fileContentJSON, null, 2));
                const base64Updates = updatedFileBuffer.toString('base64');

                const commitDetails = {
                    owner: 'AbhinavGor',
                    repo: repoDetails[4],
                    message: `Chores: Update npm package ${packageName} to ${requiredVersion}.`,
                    committer: {
                        name: process.env.USER_NAME,
                        email: process.env.USER_EMAIL
                    },
                    content: base64Updates,
                    sha: fileSHA
                }

                // console.log(commitDetails);

                //make a commit with the changes
                await octokit.request(`PUT /repos/AbhinavGor/${repoDetails[4]}/contents/package.json`, commitDetails);
            }

            

        }
    })
    
}

export default executeUpdates;