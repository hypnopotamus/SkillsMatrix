import { ChildProcess } from "child_process";

export const commandWithOutput = (command: () => ChildProcess, name: string): Promise<string> => {
    return new Promise<string>((resolve, reject) => {
        let result = '';

        const process = command();

        process.once("close", code => {
            code === 0 ? resolve(result) : reject()
        });

        process.stdout?.on('data', (data) => {
            result += `${data}`;
            console.log(`${data}`);
        });

        process.stderr?.on('data', (data) => {
            console.error(`${data}`);
        });

        process.on('close', (code) => {
            console.log(`${name} process exited with code ${code}`);
        });
    });
}