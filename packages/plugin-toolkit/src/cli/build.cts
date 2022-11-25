import { rollup } from "rollup";
import { DEBUG_CONFIG, DIST_CONFIG } from "./rollupConfig.cjs";

export type BuildArgs = {
  debug?: boolean;
};

export async function build({ debug = false }: BuildArgs = {}) {
  try {
    const options = debug ? DEBUG_CONFIG : DIST_CONFIG;
    const [rollupOptions, generateOptions] = options;
    const bundle = await rollup(rollupOptions);
    await bundle.write(generateOptions);
  } catch (err) {
    console.error("build_failed");
    throw err;
  }
}
