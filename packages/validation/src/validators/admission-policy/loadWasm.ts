import Go, {loadGoGlueCode} from '../../assets/wasm_exec.js';
import pako from 'pako';

export async function loadWasm() {
  try {
    loadGoGlueCode();
    const go = new Go();

    let buffer = pako.ungzip(await (await fetch('http://plugins.monokle.com/validation/cel.wasm.gz')).arrayBuffer());

    if (buffer[0] === 0x1f && buffer[1] === 0x8b) {
      buffer = pako.ungzip(buffer);
    }

    const result = await WebAssembly.instantiate(buffer.buffer, go.importObject);
    go.run(result.instance);
  } catch (err: any) {
    console.log(err);
  }
}
