#!/usr/bin/env node

import {Command} from 'commander';

const program = require('commander');
import run from './index';

const {version} = require('../package.json');

program
    .version(version);


program
    .command('audit <url>', {isDefault: true})
    .description('Run report with configuration')
    .action(async (url: string, command: Command) => {
        await run(url);
        return;
    });

program.parse(process.argv);
