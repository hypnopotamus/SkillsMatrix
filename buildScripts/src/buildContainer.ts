#!/usr/bin/env node

import { spawnCommandWithOutput } from "./spawnCommandWithOutput";

export interface TagList {
    readonly name: string,
    readonly tags: readonly string[];
}

const containerName = process.env.npm_package_config_container_name;
const registry = process.env.npm_package_config_container_registry;
const version = process.env.npm_package_version;
const packageRegistry = process.env.npm_package_config_container_npm_registry;

if (!containerName) throw new Error("add config.container.name in package.json");
if (!registry) throw new Error("add config.container.registry in package.json");
if (!version) throw new Error("add version in package.json");
if (!packageRegistry) throw new Error("add config.container.npm.registry in package.json");

export const tag = `${containerName}:${version}`;

export const imageAlreadyRemote = async (): Promise<boolean> => {
    const existingTags = await (await fetch(`http://${registry}/v2/${containerName}/tags/list`)).json() as TagList;

    return existingTags.tags && existingTags.tags.includes(version);
};

export const buildImage = async (): Promise<void> => {
    await spawnCommandWithOutput(
        'docker',
        [
            "build",
            "--tag", `${containerName}:latest`,
            "--tag", tag,
            "--build-arg", `REGISTRY=${packageRegistry}`,
            "."
        ],
        {}
    );
};

(async (): Promise<number> => {
    if (!await imageAlreadyRemote()) {
        await buildImage();

        return 0;
    }

    return process.env.CI ? 1 : 0;
})().then(result => process.exit(result))
    .catch(() => process.exit(-1));