import csvParser from "csv-parser";
import fetch from "node-fetch";
import fs from "fs";

export default async (filePath, packageName) => {
    const repos = [];
    console.log(packageName);
    fs.createReadStream(filePath)
        .pipe(csvParser())
        .on('data', (row) => {
            const repo = {
                name: row.name,
                url: row.repo
            }

            repos.push(repo);
        })
        .on('end', () => {
            console.log("Repositories to be tested: ");
            console.table(repos);

            const packageRawUrls = [];
            for(const i in repos){
                const tempStr = "https://raw.githubusercontent.com/" + repos[i].url.split(".com")[1] + "/main/package.json";
                packageRawUrls.push(tempStr);
                
                fetch(tempStr).then(res => res.json()).then(text => checkVersion(text, packageName));
            }
        });

    
}

function checkVersion(text, packageName){
    console.log(text.dependencies);
}
