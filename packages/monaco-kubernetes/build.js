import { readFile } from "fs/promises";
import { fileURLToPath } from "url";

import { build } from "esbuild";

const pkg = JSON.parse(
  await readFile(new URL("package.json", import.meta.url))
);

await build({
  entryPoints: ["src/index.ts", "src/kubernetes.worker.ts"],
  bundle: true,
  external: Object.keys({ ...pkg.dependencies, ...pkg.peerDependencies }),
  logLevel: "info",
  outdir: "dist",
  sourcemap: true,
  format: "esm",
  target: ["es2019"],
  plugins: [
    {
      name: "alias",
      setup({ onResolve, resolve }) {
        // The file monaco-yaml/lib/esm/schemaSelectionHandlers.js imports code from the language
        // server part that we don’t want.
        onResolve({ filter: /\/schemaSelectionHandlers$/ }, () => ({
          path: fileURLToPath(
            new URL("src/fillers/schemaSelectionHandlers.ts", import.meta.url)
          ),
        }));
        // The yaml language service only imports re-exports of vscode-languageserver-types from
        // vscode-languageserver.
        onResolve(
          { filter: /^vscode-languageserver(\/node|-protocol)?$/ },
          () => ({
            path: "vscode-languageserver-types",
            external: true,
            sideEffects: false,
          })
        );
        // Ajv would significantly increase bundle size.
        onResolve({ filter: /^ajv$/ }, () => ({
          path: fileURLToPath(new URL("src/fillers/ajv.ts", import.meta.url)),
        }));
        // The yaml language service uses path. We can stub it using path-browserify.
        onResolve({ filter: /^path$/ }, () => ({
          path: "path-browserify",
          external: true,
          sideEffects: false,
        }));
        // The main prettier entry point contains all of Prettier.
        // The standalone bundle is smaller and works fine for us.
        onResolve({ filter: /^prettier/ }, ({ path }) => ({
          path: path === "prettier" ? "prettier/standalone.js" : `${path}.js`,
          external: true,
          sideEffects: false,
        }));
        // This tiny filler implementation serves all our needs.
        onResolve({ filter: /vscode-nls/ }, () => ({
          path: fileURLToPath(
            new URL("src/fillers/vscode-nls.ts", import.meta.url)
          ),
          sideEffects: false,
        }));
        // The language server dependencies tend to write both ESM and UMD output alongside each
        // other, then use UMD for imports. We prefer ESM.
        onResolve({ filter: /\/umd\// }, ({ path, ...options }) =>
          resolve(path.replace(/\/umd\//, "/esm/"), options)
        );
        onResolve({ filter: /.*/ }, () => ({ sideEffects: false }));
      },
    },
  ],
});
