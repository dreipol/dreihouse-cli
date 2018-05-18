import Dreihouse from "@dreipol/lighthouse-runner/dist/Dreihouse";

const dreihouse = new Dreihouse(null, ['cli']);

async function run() {
    await dreihouse.startChrome(`http://fabs.io`);
    await execute();
}

async function execute() {
    await dreihouse.audit(`http://fabs.io`);
    setTimeout(async () => {
        await execute();
    }, 15000);
}


run();
