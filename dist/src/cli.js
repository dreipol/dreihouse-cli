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
const program = require('commander');
const index_1 = __importDefault(require("./index"));
const { version } = require('../package.json');
program
    .version(version);
program
    .command('audit <url>', { isDefault: true })
    .description('Run report with configuration')
    .action((url, command) => __awaiter(this, void 0, void 0, function* () {
    yield index_1.default(url);
    return;
}));
program.parse(process.argv);
//# sourceMappingURL=cli.js.map