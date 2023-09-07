import {readFile} from 'fs/promises';
import {WasmLoader} from './WasmLoader.js';

export class FileWasmLoader implements WasmLoader {
  async load(path: string): Promise<ArrayBuffer> {
    const response = await readFile(path, null);
    return response.buffer;
  }
}
