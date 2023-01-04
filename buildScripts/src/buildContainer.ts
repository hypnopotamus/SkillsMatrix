#!/usr/bin/env node

import { execCommandWithOutput } from "./execCommandWithOutput";
import { spawnCommandWithOutput } from "./spawnCommandWithOutput";
import path from "path";
import fs from "fs/promises";

interface TagList {
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
    const rootDirectory = await execCommandWithOutput("git rev-parse --show-toplevel", {});
    const currentDirectory = process.cwd();

    //this is a little wonky
    // staging workspaces for docker builds allows docker to not think it needs to reinstall packages if any file anywhere in the repo changes
    // due to copying all files as a starting step to accomodate relative paths in workspaces
    // COPY with glob patterns doesn't maintain the directory structure on the other side, all matching files go right into the destination directory
    const tempDirectory = path.join(rootDirectory, ".tmp");
    const workspaces = (JSON.parse(path.join(currentDirectory, "package.json")).workspaces as string[])
        .map(w => path.relative(rootDirectory, w));
    const stagedPackages = path.join(tempDirectory, "packages");
    const stagePackage = (workspace: string) => fs.copyFile(path.join(workspace, "package.json"), stagedPackages);
    await Promise.all(workspaces.map(stagePackage));

    const stagedWorkspaces = path.join(tempDirectory, "workspaces");
    const stageWorkspace = (workspace: string) => fs.cp(workspace, stagedWorkspaces);
    await Promise.all(workspaces.map(stageWorkspace));
    //todos
    // 5. rewrite the docker files to copy .tmp/packages before package.json
    // 6. rewrite the docker files to copy .tmp/workspaces before src
    // 7. there will be more refactoring to docker builds (don't need install prod, will need a workdir if the internal folder structure is a subset of the full repo tree)
    // 8. all builds need to include workspace builds
    // 9. get the configurations for using the container registry out of docker and out of CI
    // 10. make sure the build scripts are installed and built in CI

    await spawnCommandWithOutput(
        'docker',
        [
            "build",
            "--tag", `${containerName}:latest`,
            "--tag", tag,
            "--build-arg", `REGISTRY=${packageRegistry}`,
            currentDirectory
        ],
        {
            cwd: rootDirectory //todo refactor all docker images to be built from the root directory
        }
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