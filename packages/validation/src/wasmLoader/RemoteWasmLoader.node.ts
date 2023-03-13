import { WasmLoader } from "./WasmLoader.js";
import fetch from 'node-fetch'

export class RemoteWasmLoader implements WasmLoader {
  async load(url: string): Promise<ArrayBuffer> {
    const response = await fetch(url);
    const data = await response.arrayBuffer();
    return data;
  }
}
