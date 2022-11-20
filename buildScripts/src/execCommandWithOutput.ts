import { exec } from "child_process";
import { commandWithOutput } from "./commandWithOutput";

export const execCommandWithOutput = (...parameters: Parameters<typeof exec>) => commandWithOutput(() => exec(...parameters), parameters[0]);