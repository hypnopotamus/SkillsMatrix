import { spawn } from "child_process";
import { commandWithOutput } from "./commandWithOutput";

export const spawnCommandWithOutput = (...parameters: Parameters<typeof spawn>) => commandWithOutput(() => spawn(...parameters), [parameters[0], ...parameters[1]].join(" "));