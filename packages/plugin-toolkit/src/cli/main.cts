#!/usr/bin/env node
import cac from "cac";
import { build } from "./build.cjs";
import { startDevServer } from "./server.cjs";
import { codegen } from "./typegen.cjs";

const cli = cac("monokle-plugin-toolkit");

cli
  .command("codegen", "Generates types for known Kubernetes kinds and CRDs.")
  .action(async () => {
    try {
      await codegen();
    } catch (err) {
      handleGlobalError(err, () => cli.outputHelp());
      process.exit(1);
    }
  });

cli
  .command("dev", "Starts a Monokle plugin development server.")
  .action(async () => {
    try {
      startDevServer();
    } catch (err) {
      handleGlobalError(err, () => cli.outputHelp());
      process.exit(1);
    }
  });

cli
  .command("build", "Builds a plugin for distribution.")
  .option("-d, --debug", `[boolean] Create an unminified build to debug.`)
  .action(async (options: { debug?: boolean }) => {
    try {
      await build({ debug: options.debug });
    } catch (err) {
      handleGlobalError(err, () => cli.outputHelp());
      process.exit(1);
    }
  });

cli.help();
cli.version("0.1.0");

(async function main() {
  try {
    cli.parse(process.argv, { run: false });
    await cli.runMatchedCommand();
  } catch (err) {
    handleGlobalError(err, () => cli.outputHelp());
  }
})();

function handleGlobalError(err: unknown, showHelp: () => void) {
  if (!(err instanceof Error)) {
    showHelp();
    return;
  }

  console.log();
  console.error(err);
  console.log();

  showHelp();
}
