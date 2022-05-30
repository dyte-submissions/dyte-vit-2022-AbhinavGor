import csvParser from "csv-parser";
import fetch from "node-fetch";
import fs from "fs";

export default async (filePath, packageName) => {
    var finalRepos = [];
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
        .on('end', () => {
            const packageRawUrls = [];

            // get the package.json file URL from github
            for(const i in repos){
                const tempStr = "https://raw.githubusercontent.com/" + repos[i].url.split(".com")[1] + "/main/package.json";
                packageRawUrls.push(tempStr);

                //the required package version details
                const packageDetails = packageName.split('@');

                // get the package.json file contents from github
                fetch(tempStr)
                            .then(res => res.json())
                            .then(json => {
                                const deps = json.dependencies;
                                const currentVersion = deps[packageDetails[0]].split("^")[1];
                                const requiredVersion = packageDetails[1];
                                const neaw = {...repos[i], version: currentVersion, version_satisfied: checkVersion(currentVersion, requiredVersion)};
                                finalRepos.push(neaw);
                                console.table(finalRepos);
                            });
                            // console.table(finalRepos);
                            
            }
        });
        
}

function checkVersion(packageVersion, requiredVersion) {
    const packageVersionparts = packageVersion.split('.');
    const requiredVersionparts = requiredVersion.split('.');

    console.log({requiredVersionparts, packageVersionparts});
    for (var i = 0; i < packageVersionparts.length; ++i) {
        if (requiredVersionparts.length == i) {
            return true;
        }

        if (packageVersionparts[i] == requiredVersionparts[i]) {
            continue;
        }
        else if (packageVersionparts[i] > requiredVersionparts[i]) {
            return true;
        }
        else {
            return false;
        }
    }

    if (packageVersionparts.length != requiredVersionparts.length) {
        return false;
    }

    return true;
}

