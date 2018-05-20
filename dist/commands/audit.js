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
const Dreihouse_1 = __importDefault(require("../../../../Documents/Repositories/lighthouse-runner/dist/Dreihouse"));
const CONFIG = require('../../config/desktop.js');
const chokidar = require('chokidar');
function run(configFile, url, path) {
    return __awaiter(this, void 0, void 0, function* () {
        const dreihouse = new Dreihouse_1.default(configFile ? configFile : CONFIG, ['cli']);
        let isAuditing = false;
        yield dreihouse.startChrome(url);
        chokidar.watch(path, { ignored: /(^|[\/\\])\../ })
            .on('change', () => __awaiter(this, void 0, void 0, function* () {
            if (isAuditing) {
                return;
            }
            isAuditing = true;
            yield dreihouse.audit(url);
            isAuditing = false;
        }));
    });
}
exports.default = run;
//# sourceMappingURL=audit.js.map