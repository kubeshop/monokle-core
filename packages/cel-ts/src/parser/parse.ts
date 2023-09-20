import Parser from "web-tree-sitter";

// TODO move Tree Sitter to HTTP or find a way to embed within the library.
// TODO parser should probably change to use node.js bindings as this is much faster
// See NodeJs section of https://www.npmjs.com/package/web-tree-sitter
export async function parse(code: string): Promise<Parser.Tree> {
  await Parser.init();
  const parser = new Parser();
  const Lang = await Parser.Language.load("src/parser/tree-sitter-cel.wasm");
  parser.setLanguage(Lang);
  return parser.parse(code);
}
