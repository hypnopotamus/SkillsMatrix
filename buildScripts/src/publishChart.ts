#!/usr/bin/env node

import { execCommandWithOutput } from "./execCommandWithOutput";

const chartName = process.env.npm_package_config_chart_name;
const repository = process.env.npm_package_config_chart_repository;
const version = process.env.npm_package_version;

if (!chartName) throw new Error("add config.chart.name in package.json");
if (!repository) throw new Error("add config.chart.repository in package.json");
if (!version) throw new Error("add version in package.json");

execCommandWithOutput(
    `helm package chart --version ${version} --app-version ${version} && helm push ${chartName}-${version}.tgz ${repository}`,
    undefined,
).then(() => process.exit(0))
    .catch(() => process.exit(-1));