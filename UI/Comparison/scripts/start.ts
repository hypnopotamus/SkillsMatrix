import { exec } from "child_process";

const chartName = process.env.npm_package_config_chart_name;
const containerName = process.env.npm_package_config_container_name;
const chartRepository = process.env.npm_package_config_chart_repository;
const containerRegistry = process.env.npm_package_config_container_registry;
const version = process.env.npm_package_version;

if (!chartName) throw new Error("add config.chart.name in package.json");
if (!containerName) throw new Error("add config.container.name in package.json");
if (!chartRepository) throw new Error("add config.chart.repository in package.json");
if (!version) throw new Error("add version in package.json");
if (!containerRegistry) throw new Error("add config.container.registry in package.json");

exec(`helm upgrade --install ${chartName} ${chartRepository}/${chartName} --version ${version} --set image.host=${containerRegistry},image.name=${containerName},image.tag=${version}`)
    .once("exit", code => process.exit(code ?? 0));
