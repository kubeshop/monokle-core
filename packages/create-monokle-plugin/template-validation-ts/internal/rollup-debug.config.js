import { nodeResolve } from "@rollup/plugin-node-resolve";

export default [
  {
    input: "./build/plugin.js",
    output: [
      {
        file: "./dist/plugin-debug.js",
        format: "esm",
      },
    ],
    plugins: [nodeResolve()],
  },
];
