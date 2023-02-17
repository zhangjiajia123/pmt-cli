import { Command } from "commander";
const program = new Command();
import version from "../package.json" assert { type: "json" };
import { onList, onCurrent, onUse, onTest } from "./main.js";
export function init() {
  program
  .version(version);
  program
    .command("list")
    .alias("ls")
    .description("List all the registries")
    .action(onList);
    program
    .command("current")
    .alias("c")
    .description("Show current registry name or URL")
    .action(onCurrent)
    program
    .command("use <name>")
    .description("Change current registry")
    .action(onUse)
    program
    .command("test [registry]")
    .description("Show response time for specific or all registries")
    .action(onTest)
  program.parse();
}
