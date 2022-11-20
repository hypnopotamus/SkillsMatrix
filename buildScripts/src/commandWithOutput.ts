import { ChildProcess } from "child_process";

export const commandWithOutput = (command: () => ChildProcess, commandText: string): Promise<string> => {
    return new Promise<string>((resolve, reject) => {
        let result = '';

        console.log(commandText);
        const process = command();

        process.once("close", code => {
            console.log(`${commandText} exited with code ${code}`);

            code === 0 ? resolve(result) : reject();
        });

        process.stdout?.on('data', (data) => {
            result += `${data}`;
            console.log(`${data}`);
        });

        process.stderr?.on('data', (data) => {
            console.error(`${data}`);
        });
    });
}