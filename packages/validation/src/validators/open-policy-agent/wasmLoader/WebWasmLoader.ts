export class WebWasmLoader implements WasmLoader {
  async load(url: string): Promise<ArrayBuffer> {
    const response = await fetch(url);
    const data = await response.arrayBuffer();
    return data;
  }
}
