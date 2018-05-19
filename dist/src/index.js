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
const Dreihouse_1 = __importDefault(require("@dreipol/lighthouse-runner/dist/Dreihouse"));
const desktop_js_1 = __importDefault(require("@dreipol/lighthouse-config/config/base/desktop.js"));
const dreihouse = new Dreihouse_1.default(desktop_js_1.default, ['cli']);
function run(url) {
    return __awaiter(this, void 0, void 0, function* () {
        yield dreihouse.startChrome(url);
        yield execute(url);
    });
}
exports.default = run;
function execute(url) {
    return __awaiter(this, void 0, void 0, function* () {
        yield dreihouse.audit(url);
        setTimeout(() => __awaiter(this, void 0, void 0, function* () {
            yield execute(url);
        }), 15000);
    });
}
//# sourceMappingURL=index.js.map