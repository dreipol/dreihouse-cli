import ConsoleLogger from "@dreipol/lighthouse-runner/dist/Logger/ConsoleLogger";
import Dreihouse from "@dreipol/lighthouse-runner/dist/Dreihouse";
const {version} = require('../../package.json');

export default async function report(rootUrl: string, configFile: string | null, reporter: string[], port: number, verbose: number) {
    const printer = new ConsoleLogger(verbose);
    printer.info(`Dreihouse-Cli v${ version }`);
    try {
        const dreihouse = new Dreihouse(configFile, reporter, printer);
        await dreihouse.execute(rootUrl, port);
        printer.info('Dreihouse completed');
    } catch (e) {
        if (!verbose) {
            console.error(e);
        }
        process.exit(1);
    }
}
