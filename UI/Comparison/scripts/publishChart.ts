import { exec } from "child_process";

const chartName = process.env.npm_package_config_chart_name;
const repository = process.env.npm_package_config_chart_repository;
const version = process.env.npm_package_version;

if (!chartName) throw new Error("add config.chart.name in package.json");
if (!repository) throw new Error("add config.chart.repository in package.json");
if (!version) throw new Error("add version in package.json");

exec(`helm package chart/${chartName} --version ${version} --app-version ${version} && helm push ${chartName}-${version}.tgz ${repository}`)
    .once("exit", code => process.exit(code ?? 0));