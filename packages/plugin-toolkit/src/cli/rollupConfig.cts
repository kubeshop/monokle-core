import nodeResolve from "@rollup/plugin-node-resolve";
import typescript from "@rollup/plugin-typescript";
import { OutputOptions, Plugin, RollupOptions } from "rollup";
import { terser } from "rollup-plugin-terser";

export const DIST_CONFIG: [RollupOptions, OutputOptions] = [
  {
    input: "./src/plugin.ts",
    plugins: [nodeResolve() as Plugin, typescript() as Plugin],
    onwarn(warning, defaultHandler) {
      const ignoreCodes = ["TS7006", "TS7031"];
      const knownErrors = ["Cannot find module '@monokle/validation/custom'"];
      const skip =
        ignoreCodes.some((c) => warning.pluginCode === c) ||
        knownErrors.some((e) => warning.message.includes(e));

      if (skip) {
        return;
      }
      defaultHandler(warning);
    },
  },
  {
    file: "dist/plugin.js",
    format: "esm",
    plugins: [terser() as Plugin],
  },
];

export const DEBUG_CONFIG: [RollupOptions, OutputOptions] = [
  {
    input: "src/plugin.ts",
    plugins: [nodeResolve() as Plugin, typescript() as Plugin],
  },
  {
    file: "dist/plugin.debug.js",
    format: "esm",
  },
];
