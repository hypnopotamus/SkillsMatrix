#!/usr/bin/env node

import { spawnCommandWithOutput } from "./spawnCommandWithOutput";

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

const imageAlreadyRemote = async (): Promise<boolean> => {
    const existingTags = await (await fetch(`http://${registry}/v2/${containerName}/tags/list`)).json() as TagList;

    return existingTags.tags && existingTags.tags.includes(version);
};

const buildImage = async (): Promise<void> => {
    await spawnCommandWithOutput(
        'docker',
        [
            "build",
            "--tag", `${containerName}:latest`,
            "--tag", tag,
            "--network", "host",
            "."
        ],
        {}
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
})().then(() => process.exit(0))
    .catch(() => process.exit(-1));