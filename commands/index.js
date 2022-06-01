import csvParser from "csv-parser";
import fetch from "node-fetch";
import fs from "fs";
import executeUpdates from "./executeUpdates.js";
import checkVersion from './checkVersion.js';

global.finalRepos = [];

export default async (filePath, packageName, update) => {
    const repos = [];
    fs.createReadStream(filePath)
        .pipe(csvParser())
        .on('data', (row) => {
            const repo = {
                name: row.name,
                url: row.repo,
                version: '',
                version_satisfied: null
            }

            repos.push(repo);
        })
        .on('end', async () => {
            const packageRawUrls = [];

            // get the package.json file URL from github
            for(const i in repos){
                const tempStr = "https://raw.githubusercontent.com/" + repos[i].url.split(".com")[1] + "/main/package.json";
                packageRawUrls.push(tempStr);

                //the required package version details
                const packageDetails = packageName.split('@');

                // get the package.json file contents from github
                
                let response = await fetch(tempStr);
                response = await response.json();
                const deps = response.dependencies;
                const currentVersion = deps[packageDetails[0]].split("^")[1];
                const requiredVersion = packageDetails[1];
                const finalRepo = {...repos[i], version: currentVersion, version_satisfied: checkVersion(currentVersion, requiredVersion)};
                finalRepos.push(finalRepo);                            
            }

            console.table(finalRepos);
            const packageDetails = packageName.split('@');

            //check if the user has requested for updates
            if(update){
                executeUpdates(finalRepos, packageDetails[0], packageDetails[1]);
            }
            
        });
}