import { parseDocument, Document, LineCounter, ParsedNode } from "yaml";
import { Resource } from "./types.js";
import { Region } from "./sarif.js";

type ParsedResource = {
  parsedDoc: Document.Parsed<ParsedNode>;
  lineCounter: LineCounter;
};

type ParseOptions = {
  forceParse?: boolean;
};

const DEFAULT_OPTIONS = {
  forceParse: false,
};

export class ResourceParser {
  private cache = new Map<string, ParsedResource>();

  parse(resource: Resource, options: ParseOptions = DEFAULT_OPTIONS) {
    const cacheId = resource.id;
    const cachedDoc = this.cache.get(cacheId);

    if (options.forceParse === false && cachedDoc) {
      return cachedDoc;
    }

    const lineCounter = new LineCounter();
    const parsedDoc = parseYamlDocument(resource.text, lineCounter);
    const doc = { parsedDoc, lineCounter };
    this.cache.set(cacheId, doc);

    return doc;
  }

  parseErrorRegion(resource: Resource, pos: [number, number, number?]): Region {
    const { lineCounter } = this.parse(resource);
    const start = lineCounter.linePos(pos[0]);
    const end = lineCounter.linePos(pos[1]);

    return {
      startLine: start.line,
      startColumn: start.col,
      endLine: end.line,
      endColumn: end.col,
    };
  }

  clear(resourceIds?: string[]) {
    if (!resourceIds) {
      this.cache.clear();
      // clearAllRefNodesCache();
      return;
    }

    for (const id of resourceIds) {
      this.cache.delete(id);
      // clearRefNodesCache(id);
    }
  }
}

function parseYamlDocument(text: string, lineCounter?: LineCounter) {
  return parseDocument(text, { lineCounter, uniqueKeys: false, strict: false });
}
