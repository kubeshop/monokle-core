import { LineCounter, Scalar } from "yaml";
import { RefPosition } from "./types.js";

/**
 * Utility class used when parsing and creating refs
 */
export class NodeWrapper {
  node: Scalar;
  lineCounter?: LineCounter;

  constructor(node: Scalar, lineCounter?: LineCounter) {
    this.node = node;
    this.lineCounter = lineCounter;
  }

  nodeValue(): string {
    return this.node.value as string;
  }

  getNodePosition(): RefPosition {
    if (this.lineCounter && this.node.range) {
      const linePos = this.lineCounter.linePos(this.node.range[0]);
      return {
        line: linePos.line,
        column: linePos.col,
        length: this.node.range[1] - this.node.range[0],
      };
    }

    return { line: 0, column: 0, length: 0 };
  }
}
