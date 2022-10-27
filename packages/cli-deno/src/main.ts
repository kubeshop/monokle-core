import { Command } from "https://deno.land/x/cliffy@v0.25.2/command/mod.ts";
import { validate } from "./validate.ts";
console.log("START");

await new Command()
  .name("monokle")
  .version("0.1.0")
  .description("Static analysis for Kubernetes resources")
  .command("validate", validate)
  .parse(Deno.args);
