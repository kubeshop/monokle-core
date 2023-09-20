import Parser from "web-tree-sitter";
import { Code, CodeGen, Name, ValueScope, _, operators } from "./ajv";
import invariant from "tiny-invariant";

export function interpret(tree: Parser.Tree) {
  const scope = new ValueScope({ scope: {} });
  const gen = new CodeGen(scope);
  const code = codegenRec(gen, tree.rootNode);

  const object = new Name("object");

  const executeFn = new Function(
    object.toString(),
    `return ${code.toString()}`
  );
  return executeFn;
}

function codegenRec(gen, node: Parser.SyntaxNode | null): Code {
  if (!node) {
    throw new Error("root unhandled");
  }

  console.log("[debug] codegen", node.type, node.text);
  switch (node.type) {
    case "expr": {
      return codegenRec(gen, node.firstChild);
    }
    case "binary_expression": {
      return createBinaryExpression(gen, node);
    }
    case "select_expression": {
      return createSelectExpression(gen, node);
    }
    case "int_literal": {
      return createNumber(gen, node);
    }
    default: {
      console.log("[not yet implemented]", node.text);
      return _``;
    }
  }
}

function createSelectExpression(gen: CodeGen, node: Parser.SyntaxNode): Code {
  invariant(node.type === "select_expression");
  const operand = node.childForFieldName("operand");
  const member = node.childForFieldName("member");
  invariant(operand && member);

  if (operand.type === "select_expression") {
    const code = createSelectExpression(gen, operand);
    return _`${code}?.[${member.text}]`;
  } else {
    const obj = new Name(operand.text);
    return _`${obj}?.[${member.text}]`;
  }
}

function createNumber(gen, node: Parser.SyntaxNode): Code {
  const value = Number(node.firstChild?.text);
  invariant(node.type === "int_literal" && !Number.isNaN(value));
  return _`${value}`;
}

function createBinaryExpression(gen, node: Parser.SyntaxNode): Code {
  const operatorCode = createOperator(node.child(1));
  const leftCode = codegenRec(gen, node.childForFieldName("left"));
  const rightCode = codegenRec(gen, node.childForFieldName("right"));
  const code = _`${leftCode} ${operatorCode} ${rightCode}`;
  return code;
}

function createOperator(node: Parser.SyntaxNode | null): Code {
  invariant(node, "unexpected null");

  switch (node.text) {
    case "<=":
      return operators.LTE;
    case "&&":
      return operators.AND;
    default:
      throw new Error("invalid_operator");
  }
}
