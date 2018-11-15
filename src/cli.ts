#!/usr/bin/env node
import {Command} from 'commander';
import audit from './commands/audit';
import setup from "./commands/setup";
import report from "./commands/report";

const program = require('commander');

const {version} = require('../package.json');


function increaseVerbosity(v: string, total: number) {
    return total + 1;
}

program
    .version(version);

program
    .command('setup <folder>')
    .description('Setup default configuration')
    .action(async (folder: string) => {
        await setup(folder);
    });

program
    .command('audit <url> <path>', {isDefault: true})
    .option('-f, --config-file <file>', 'Define the root url of the page', null)
    .description('Continiously audit url when files change in given path')
    .action(async (url: string, path: string, command: Command) => {
        const {configFile} = command;
        await audit(configFile, url, path);
        return;
    });

program
    .command('report <root-url>')
    .description('Run report with configuration')
    .option('-v, --verbose', 'Verbose output', increaseVerbosity, 0)
    .option('-f, --config-file <file>', 'Define the root url of the page', null)
    .option('-r, --reporter <items>', 'Add list of reporters to use for handling the result', (val: string) => val.split(','), ['cli'])
    .option('-p, --port <port>', 'Use given port for debugging')
    .action(async (rootUrl: string, command: Command) => {
        const {verbose, port, reporter, configFile} = command;
        await report(rootUrl, configFile, reporter, port, verbose ? verbose : 0);
        return;
    });

program.parse(process.argv);
