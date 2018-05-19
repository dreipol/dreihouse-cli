import Dreihouse from "@dreipol/lighthouse-runner/dist/Dreihouse";

const CONFIG = require('@dreipol/lighthouse-config/config/base/desktop.js');
const chokidar = require('chokidar');

CONFIG.chromeFlags = ['--headless'];

const dreihouse = new Dreihouse(CONFIG, ['cli']);
let isAuditing = false;

export default async function run(url: string, path: string) {
    await dreihouse.startChrome(url);

    chokidar.watch(path, {ignored: /(^|[\/\\])\../})
        .on('change', async () => {
            if (isAuditing) {
                return;
            }

            isAuditing = true;
            await dreihouse.audit(url);
            isAuditing = false;
        });
}
