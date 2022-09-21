import { readFile } from "fs/promises";

export class NodeWasmLoader implements WasmLoader {
  async load(path: string): Promise<ArrayBuffer> {
    const response = await readFile(path, null);
    return response.buffer;
  }
}
