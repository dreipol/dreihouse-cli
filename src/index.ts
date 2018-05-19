import Dreihouse from "@dreipol/lighthouse-runner/dist/Dreihouse";

const CONFIG = require('@dreipol/lighthouse-config/config/base/desktop.js');
var chokidar = require('chokidar');

const dreihouse = new Dreihouse(CONFIG, ['cli']);

export default async function run(url: string) {
    await dreihouse.startChrome(url);

    chokidar.watch('./src', {ignored: /(^|[\/\\])\../})
        .on('change', async () => {
            await dreihouse.audit(url);
        });
}
