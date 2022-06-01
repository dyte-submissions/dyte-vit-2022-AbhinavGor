import fetch from "node-fetch";
import getVersions from "./getVersions.js";
import Configstore from 'configstore';
import pkg from 'enquirer';
import executeUpdates from "./executeUpdates.js";
import checkVersion from "./checkVersion.js";
import chalk from "chalk";

const {prompt} = pkg;

export default async (repositoryLink) => {
    const rawStr = "https://raw.githubusercontent.com/" + repositoryLink.split(".com")[1] + "/main/package.json";

    const possibleUpdates = [];
    let response = await fetch(rawStr);
    response = await response.json();
    const deps = Object.keys(response.dependencies);
    const versions = Object.values(response.dependencies);
    for(const i in deps){
        const availVerions = await getVersions(deps[i]);
        possibleUpdates.push({
            dep_name: deps[i],
            dep_version: versions[i].split("^")[1],
            latest_available_version: [...availVerions].pop()
        });
    }

    console.table(possibleUpdates);

    //ask which ones have to be updated
    const config = new Configstore('update_indices');
    const {update_indices} = await prompt({
        type: "text",
        name: 'update_indices',
        message: 'Enter the indices of the packages which you want to update (separate each index with a space):'
    });

    config.set({ update_indices });

    //Update the required packages

    const updateIndices = update_indices.split(" ");

    if(updateIndices.length > 1){
        for(const i in updateIndices){
            const repo = [{
                url: repositoryLink,
                version_satisfied: checkVersion(possibleUpdates[updateIndices[i]].dep_version, possibleUpdates[updateIndices[i]].latest_available_version)
            }];
            
            executeUpdates(repo, possibleUpdates[updateIndices[i]].dep_name, possibleUpdates[updateIndices[i]].latest_available_version);
        }
    }else{
        console.log(chalk.yellowBright("[*] No updates were requested by the user! Exiting."))
    }
}