const { Command } = require('commander');
const program = new Command();
const version = require("../package.json").version;
const { onList, onCurrent, onUse, onTest } = require("./main").default;
program
  .version(version, "-v, --version, -V");
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
