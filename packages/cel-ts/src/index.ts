import { interpret } from "./interpreter/interpret";
import { parse } from "./parser/parse";
import Yaml from "yaml";

type EvaluateFn<T = any> = (params: T) => boolean;

/**
 * Compiles a CEL expression into an executable function.
 */
export async function compile(expression: string): Promise<EvaluateFn> {
  const ast = await parse(expression);
  const execute = interpret(ast);
  return execute as EvaluateFn;
}

/**
 * Compiles and executes a CEL expression with given parameters.
 */
export async function evaluate<T>(expression: string, params?: T) {
  const evaluateFn = await compile(expression);
  return evaluateFn(params);
}

const deployment = Yaml.parse(`apiVersion: apps/v1
kind: Deployment
metadata:
  name: demo
spec:
  replicas: 3
  selector:
    matchLabels:
      app.kubernetes.io/name: demo
  template:
    metadata:
      labels:
        app.kubernetes.io/name: demo
    spec:
      containers:
        - name: demo
          image: demo:latest
`);

/**
 * Quick tests with `npx tsx src/index.ts`.
 */
(async function main() {
  const expression = "object.spec.replicas <= 5";
  const result = await evaluate(expression, deployment);
    console.log("result?", result);
})()
