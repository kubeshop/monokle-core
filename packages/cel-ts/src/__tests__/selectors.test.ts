import { it, expect } from "vitest";
import { evaluate } from "..";
import Yaml from "yaml";

it("should handle <= comparisons", async () => {
  const object = createDeployment();
  expect(await evaluate("object.spec.replicas < 4", object)).toBeTruthy();
});

function createDeployment() {
  return Yaml.parse(`apiVersion: apps/v1
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
}
