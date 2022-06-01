#!/usr/bin/env node

import { program } from "commander";
import getUpdates from "./commands/getUpdates.js";
import getStatus from './commands/index.js';

program.description("Update all npm packages on your github projects");
program.name("agcli")
    .version('1.0.0')
    .usage("<command>")
    .addHelpCommand(false)
    .helpOption(false);

program
    .argument('<package_name@version>', "Name and version of the npm package to be tested")
    .option('-i, --input <input_file_path>', 'blue')
    .option('-update')
    .action((packageName) => {
        const opt = program.opts();
        getStatus(opt.input, packageName, opt.Update);
    });

program.command("get-updates")
    .argument('<repository_link>', "Link of the repository to be checked")
    .action((repositoryLink) => {
        getUpdates(repositoryLink);
    })

program.parse(process.argv);