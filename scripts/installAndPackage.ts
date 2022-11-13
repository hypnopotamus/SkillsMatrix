import * as fs from "fs";
import * as path from "path";
import { spawn } from "child_process";

interface Package {
    readonly name: string;
    readonly version: string;
    readonly path: string;
    readonly localDependencies: Package[];
    published: boolean;
};

interface Dependency {
    readonly [name: string]: string;
}

const spawnCommandWithOutput = (...parameters: Parameters<typeof spawn>): Promise<string> => {
    return new Promise<string>((resolve, reject) => {
        let result = '';

        const command = spawn(...parameters);

        command.once("close", code => {
            code === 0 ? resolve(result) : reject()
        });

        command.stdout?.on('data', (data) => {
            result += `${data}`;
            console.log(`${data}`);
        });

        command.stderr?.on('data', (data) => {
            console.error(`${data}`);
        });

        command.on('close', (code) => {
            console.log(`${parameters[0]} process exited with code ${code}`);
        });
    });
}

const packageFactory = (packagePath: string): Package => {
    const { name, version }: { name: string, version: string } = JSON.parse(fs.readFileSync(path.join(packagePath, "package.json")).toString());

    return {
        name,
        version,
        path: packagePath,
        localDependencies: [],
        published: false
    };
};

const findAllPackages = (): Package[] => {
    const packages: string[] = [];

    const rootDirectory = path.normalize(path.join(__dirname, ".."));
    const directoryStack = [rootDirectory];
    while (directoryStack.length) {
        const directory = directoryStack.pop();
        if (!directory) continue;

        const filesAndFolders = fs.readdirSync(directory, { withFileTypes: true });
        for (const fileOrFolder of filesAndFolders) {
            if (fileOrFolder.name === "node_modules") continue;

            if (fileOrFolder.isDirectory()) {
                directoryStack.push(path.join(directory, fileOrFolder.name));
                continue;
            }

            if (directory === rootDirectory) continue;

            if (fileOrFolder.isFile() && fileOrFolder.name === "package.json") {
                packages.push(directory);
                continue;
            }
        }
    }

    return packages.map(packageFactory);
};

const packages = findAllPackages();
const packagesToPublish = new Set<Package>();
for (const localPackage of packages) {
    const { dependencies, devDependencies }: { dependencies: Dependency, devDependencies: Dependency } = JSON.parse(fs.readFileSync(path.join(localPackage.path, "package.json")).toString());

    const allDependencies = { ...dependencies, ...devDependencies };
    const localDependencies = Object.keys(allDependencies)
        .filter(d => d.startsWith("@skillsmatrix") && !allDependencies[d].startsWith("file:"))
        .map(d => packages.find(p => p.name === d)!);

    localPackage.localDependencies.push(...localDependencies);
    for (const dependency of localDependencies) packagesToPublish.add(dependency);
}

const publishedPackages: Package[] = [];
const pendingPackages = new Set([...packages]);

const installAndPublish = async (): Promise<number> => {
    const npm = process.platform === 'win32' ? 'npm.cmd' : 'npm';

    try {
        while (pendingPackages.size) {
            const readyPackages = [...pendingPackages]
                .filter(p => p.localDependencies.every(d => publishedPackages.includes(d)));

            for (const readyPackage of readyPackages) {
                await spawnCommandWithOutput(
                    npm,
                    ['install'],
                    { cwd: readyPackage.path }
                );

                if (packagesToPublish.has(readyPackage)) {
                    const versions: readonly string[] = await (async () => {
                        try {
                            return JSON.parse(
                                await spawnCommandWithOutput(
                                    npm,
                                    ['view', readyPackage.name, 'versions', '--json'],
                                    { cwd: readyPackage.path }
                                )
                            )
                        } catch (err) {
                            return [];
                        }
                    })();

                    if (!versions.includes(readyPackage.version)) {
                        await spawnCommandWithOutput(
                            npm,
                            ['run', 'build'],
                            { cwd: readyPackage.path }
                        );
                        await spawnCommandWithOutput(
                            npm,
                            ['publish'],
                            { cwd: readyPackage.path }
                        );
                    }

                    publishedPackages.push(readyPackage);
                }

                pendingPackages.delete(readyPackage);
            }
        }
    } catch (err) {
        console.log(err);

        return -1;
    }

    return 0;
};

installAndPublish()
    .then(code => {
        process.exit(code)
    });