import NoopLogger from "../../../../Documents/Repositories/lighthouse-runner/dist/Logger/NoopLogger";
import ConsoleLogger from "../../../../Documents/Repositories/lighthouse-runner/dist/Logger/ConsoleLogger";
import Dreihouse from "../../../../Documents/Repositories/lighthouse-runner/dist/Dreihouse";

export default async function report(rootUrl: string, configFile: string | null, reporter: string[], port: number, verbose: boolean) {
    const printer = verbose ? new ConsoleLogger() : new NoopLogger();
    try {
        const dreihouse = new Dreihouse(configFile, reporter, printer);
        await dreihouse.execute(rootUrl, port);
        printer.print('Dreihouse completed');
    } catch (e) {
        console.error(e.message);
        process.exit(e.co);
    }
}
