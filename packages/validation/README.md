# Monokle validation

Flexible validation of Kubernetes resources.

## Getting started

Start by installing monokle-validation to your codebase:

```
npm install @monokle/validation
```

Afterwards you can compose your validator as follows:

```typescript
const parser = new ResourceParser();
const schemaLoader = new SchemaLoader();
const schemaValidator = new KubernetesSchemaValidator(parser, schemaLoader);
const labelsValidator = new LabelsValidator(parser);
const yamlValidator = new YamlValidator(parser);

const validator = new MonokleValidator([
  labelsValidator,
  yamlValidator,
  schemaValidator,
  resourceLinksValidator,
]);
```

Once you've created your validator you will have to configure it.
You can reconfigure it as many times as you want in between uses.

```typescript
await validator.configure([
  {
    tool: "labels",
    enabled: true,
  },
  {
    tool: "yaml-syntax",
    enabled: true,
  },
  {
    tool: "kubernetes-schema",
    enabled: true,
    schemaVersion: "1.24.2",
  },
]);
```

Once initialized you can validate resources fully or incrementally:

```typescript
const response = await validator.validate(resources);

// later
const editedResource = resources[0];
const response = await validator.validate(resources, {
  resourceIds: [editedResource.id],
});
```

The response uses [Static Analysis Results Interchange Format (SARIF)](https://docs.oasis-open.org/sarif/sarif/v2.1.0/csprd01/sarif-v2.1.0-csprd01.html). This improves interoperability with other tools.

## Caveats

- Use `processRefs` before validating with a _resource-links_ validator. It creates a graph between resources and sees if links between them are present or missing.
- @monokle/validation expects fetch on global scope so please use isomorphic-fetch if this is not available (e.g. NodeJs).
