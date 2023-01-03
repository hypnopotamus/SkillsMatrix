#!/usr/bin/env node

import { imageAlreadyRemote, buildImage, tag } from "./buildContainer";
import { spawnCommandWithOutput } from "./spawnCommandWithOutput";

const containerName = process.env.npm_package_config_container_name;
const registry = process.env.npm_package_config_container_registry;
const version = process.env.npm_package_version;
const packageRegistry = process.env.npm_package_config_container_npm_registry;

if (!containerName) throw new Error("add config.container.name in package.json");
if (!registry) throw new Error("add config.container.registry in package.json");
if (!version) throw new Error("add version in package.json");
if (!packageRegistry) throw new Error("add config.container.npm.registry in package.json");

const registryTag = `${registry}/${tag}`;

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

(async (): Promise<number> => {
    if (!await imageAlreadyRemote()) {
        await buildImage();
        await pushImage();

        return 0;
    }

    return process.env.CI ? 1 : 0;
})().then(result => process.exit(result))
    .catch(() => process.exit(-1));