import {
  ArgumentsCamelCase,
  CommandBuilder,
  CommandModule,
} from "https://cdn.deno.land/yargs/versions/yargs-v16.2.1-deno/raw/deno.ts";

type CommandInit<TOptions> = {
  command: string;
  describe: string;
  builder?: CommandBuilder<{}, TOptions>;
  handler: (args: ArgumentsCamelCase<TOptions>) => void | Promise<void>;
};

export function command<TOptions>(
  init: CommandInit<TOptions>
): CommandModule<{}, TOptions> {
  return init as CommandModule<{}, TOptions>;
}
