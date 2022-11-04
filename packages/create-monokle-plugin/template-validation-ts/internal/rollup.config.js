import { nodeResolve } from "@rollup/plugin-node-resolve";
import { terser } from "rollup-plugin-terser";

export default [
  {
    input: "./build/plugin.js",
    output: [
      {
        file: "./dist/plugin.js",
        format: "esm",
      },
    ],
    plugins: [nodeResolve(), terser()],
  },
];
