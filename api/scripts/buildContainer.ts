import path from "path";
import { spawn } from "child_process";

interface TagList {
    readonly name: string,
    readonly tags: readonly string[];
}

const containerName = process.env.npm_package_config_container_name;
const registry = process.env.npm_package_config_container_registry;
const version = process.env.npm_package_version;

if (!containerName) throw new Error("add config.container.name in package.json");
if (!registry) throw new Error("add config.container.registry in package.json");
if (!version) throw new Error("add version in package.json");

const tag = `${containerName}:${version}`;
const registryTag = `${registry}/${tag}`;

const spawnCommandWithOutput = (...parameters: Parameters<typeof spawn>): Promise<void> => {
    return new Promise<void>((resolve, reject) => {
        const command = spawn(...parameters);

        command.once("close", code => {
            code === 0 ? resolve() : reject()
        });

        command.stdout?.on('data', (data) => {
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

const imageAlreadyRemote = async (): Promise<boolean> => {
    const existingTags = await (await fetch(`http://${registry}/v2/${containerName}/tags/list`)).json() as TagList;

    return existingTags.tags && existingTags.tags.includes(version);
};

const buildImage = async (): Promise<void> => {
    await spawnCommandWithOutput(
        'docker',
        [
            "build", ".",
            "--tag", `${containerName}:latest`,
            "--tag", tag
        ],
        { cwd: path.normalize(path.join(__dirname, "..")) }
    );
};

const pushImage = async (): Promise<void> => {
    await spawnCommandWithOutput(
        'docker',
        [
            "image", "tag",
            tag, registryTag
        ],
        {}
    );

    await spawnCommandWithOutput(
        'docker',
        [
            "image", "push",
            registryTag
        ],
        {}
    );
};

(async (): Promise<void> => {
    if (!await imageAlreadyRemote()) {
        await buildImage();
        await pushImage();
    }
})().then(() => process.exit(0));