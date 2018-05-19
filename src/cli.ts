#!/usr/bin/env node

import {Command} from 'commander';
import run from './index';

const program = require('commander');

const {version} = require('../package.json');

program
    .version(version);

program
    .command('audit <url> <path>', {isDefault: true})
    .description('Run report with configuration')
    .action(async (url: string, path: string, command: Command) => {
        await run(url, path);
        return;
    });

program.parse(process.argv);
