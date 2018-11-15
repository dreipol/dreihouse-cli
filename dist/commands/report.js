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
const ConsoleLogger_1 = __importDefault(require("@dreipol/lighthouse-runner/dist/Logger/ConsoleLogger"));
const lighthouse_runner_1 = __importDefault(require("@dreipol/lighthouse-runner"));
const { version } = require('../../package.json');
function report(rootUrl, configFile, reporter, port, verbose) {
    return __awaiter(this, void 0, void 0, function* () {
        const printer = new ConsoleLogger_1.default(verbose);
        printer.info(`Dreihouse-Cli v${version}`);
        try {
            const dreihouse = new lighthouse_runner_1.default(configFile, reporter, printer);
            yield dreihouse.execute(rootUrl, port);
            printer.info('Dreihouse completed');
        }
        catch (e) {
            console.error(e);
            process.exit(1);
        }
    });
}
exports.default = report;
//# sourceMappingURL=report.js.map