import fetch from "node-fetch";
import getVersions from "./getVersions.js";
import Configstore from 'configstore';
import pkg from 'enquirer';

const {prompt} = pkg;

export default async (repositoryLink) => {
    const repoLinkRetails = repositoryLink.split("/");
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
            dep_version: versions[i],
            latest_available_version: [...availVerions].pop()
        });
    }

    console.table(possibleUpdates);

    //ask which ones have to be updated
    const config = new Configstore('update_indices');
    const {update_indices} = await prompt({
        type: "text",
        name: 'update_indices',
        message: 'Enter the indices of the packages which you want to update:'
    });

    config.set({ update_indices });

    //Update the required packages

    
}