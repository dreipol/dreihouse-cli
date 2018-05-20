#!/usr/bin/env node
"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const audit_1 = __importDefault(require("./audit"));
const setup_1 = __importDefault(require("./setup"));
const report_1 = __importDefault(require("./report"));
const program = require('commander');
const { version } = require('../package.json');
program
    .version(version);
program
    .command('setup <folder>')
    .description('Setup default configuration')
    .action((folder) => __awaiter(this, void 0, void 0, function* () {
    yield setup_1.default(folder);
}));
program
    .command('audit <url> <path>', { isDefault: true })
    .option('-f, --config-file <file>', 'Define the root url of the page', null)
    .description('Continiously audit url when files change in given path')
    .action((url, path, command) => __awaiter(this, void 0, void 0, function* () {
    const { configFile } = command;
    yield audit_1.default(configFile, url, path);
    return;
}));
program
    .command('report <root-url>')
    .description('Run report with configuration')
    .option('-v, --verbose', 'Verbose output')
    .option('-f, --config-file <file>', 'Define the root url of the page', null)
    .option('-r, --reporter <items>', 'Add list of reporters to use for handling the result', (val) => val.split(','), ['cli'])
    .option('-p, --port <port>', 'Use given port for debugging')
    .action((rootUrl, command) => __awaiter(this, void 0, void 0, function* () {
    const { verbose, port, reporter, configFile } = command;
    yield report_1.default(rootUrl, configFile, reporter, port, verbose);
    return;
}));
program.parse(process.argv);
//# sourceMappingURL=cli.js.map