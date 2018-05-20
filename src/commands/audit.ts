import Dreihouse from "../../../../Documents/Repositories/lighthouse-runner/dist/Dreihouse";

const CONFIG = require('../../config/desktop.js');
const chokidar = require('chokidar');


export default async function run(configFile: string | null, url: string, path: string) {

    const dreihouse = new Dreihouse(configFile ? configFile : CONFIG, ['cli']);
    let isAuditing = false;

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
