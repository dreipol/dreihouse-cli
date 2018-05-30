import ConsoleLogger from "@dreipol/lighthouse-runner/dist/Logger/ConsoleLogger";
import Dreihouse from "@dreipol/lighthouse-runner/dist/Dreihouse";

export default async function report(rootUrl: string, configFile: string | null, reporter: string[], port: number, verbose: number) {
    const printer = new ConsoleLogger(verbose);
    try {
        const dreihouse = new Dreihouse(configFile, reporter, printer);
        await dreihouse.execute(rootUrl, port);
        printer.info('Dreihouse completed');
    } catch (e) {
        if(!verbose){
            console.error(e.message);
        }
        process.exit(1);
    }
}
