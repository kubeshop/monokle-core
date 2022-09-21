export interface WasmLoader {
  load(src: string): Promise<ArrayBuffer>;
}
