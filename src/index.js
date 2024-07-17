const { Command } = require("commander");
const program = new Command();
// import version from "../package.json" assert { type: "json" };
const { version } = require("../package.json");
const { onList, onCurrent, onUse, onTest } = require("./main.js");
export function init() {
  program.version(version.version, "-v, --version, -V");
  program
    .command("list")
    .alias("ls")
    .description("List all the registries")
    .action(onList);
  program
    .command("current")
    .alias("c")
    .description("Show current registry name or URL")
    .action(onCurrent);
  program
    .command("use <name>")
    .description("Change current registry")
    .action(onUse);
  program
    .command("test [registry]")
    .description("Show response time for specific or all registries")
    .action(onTest);
  program.parse();
}
