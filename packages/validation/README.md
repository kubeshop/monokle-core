<p align="center">
  <img src="docs/images/large-icon-256.png" alt="Monokle Logo" width="128" height="128"/>
</p>

<p align="center">
Extensible, static Kubernetes analysis</a>
</p>

<p align="center">
  <a href="https://github.com/kubeshop/monokle-core/tree/main/packages/validation">
    <img title="mit licence" src="https://img.shields.io/badge/License-MIT-yellow.svg"/>
  </a>
</p>

# Welcome to Monokle Validation

Monokle Validation is a TypeScript library to validate your Kubernetes resources.

## Key features

- 🚀 Start in seconds with the user-friendly configuration and powerful core plugins.
- ⚡️ Real-time validation through incremental runs.
- ⚒ Extensible architecture with custom plugins.

## Core plugins

- YAML Syntax validates that your manifests have correct YAML syntax.
- Kubernetes Schema validates that your resources and CRDs are well-defined in the schema for their resource kind.
- Resource links validates that reference to other Kubernetes resources are valid.
- Open Policy agent validates security policies to reduce your attack surface.

Learn more about each Core Plugin in the [Core Plugins Documentation](docs/core-plugins.md) 

## Custom Plugins

Easily create your own validators in typescript - [Read More](docs/custom-plugins.md) 

## Community Plugins

Share your custom validators in the [Monokle Community Plugins](https://github.com/kubeshop/monokle-community-plugins) repo, 
or use any existing community validators as [described below](#using-community-plugins).

## Validate from the CLI or Monokle Cloud 

The [Monokle CLI](../cli) provides a convenient wrapper around this library. Use it to validate your resources in seconds:

```bash
kustomize build . | monokle validate -
```

Or visit [Monokle Cloud](https://app.monokle.com); a free web application where you can apply this validation 
library directly on public GitHub repositories.

## Table of contents

- [Getting started](#getting-started)
- [Configuration](#configuration)
- [The validation response](#the-validation-response)
- [Advanced usage](#advanced-usage)
  - [Preloading](#preloading)
  - [Incremental validation](#incremental-validation)
  - [Community plugins](#using-community-plugins)
  - [Building user interfaces](#building-user-interfaces)
- [Caveats](#caveats)

## Getting started

First install the validator with npm:

```
npm install @monokle/validation
```

Afterwards you can use it as follows:

```typescript
const validator = createDefaultMonokleValidator();
await validator.validate({ resources: RESOURCES });
```

The Monokle validator is extensible and has a rich plugin system. You can configure and preload 
plugins as follows:

```typescript
const validator = createDefaultMonokleValidator();

await validator.preload({
  plugins: {
    "kubernetes-schema": true,
  },
});

await validator.validate({ resources });
```

## Configuration

You can customize the rules and settings of the Monokle Validator through an intuitive object.

```yaml
plugins:
  yaml-syntax: true
  open-policy-agent: true
  kubernetes-schema: true
rules:
  yaml-syntax/no-bad-alias: "err"
  yaml-syntax/no-bad-directive: false
  open-policy-agent/no-last-image: "warn"
settings:
  kubernetes-schema:
    schemaVersion: v1.24.2
```

[Learn more](https://github.com/kubeshop/monokle-core/blob/main/packages/validation/docs/configuration.md)

## The validation response

The response uses [Static Analysis Results Interchange Format (SARIF)](https://docs.oasis-open.org/sarif/sarif/v2.1.0/csprd01/sarif-v2.1.0-csprd01.html).

SARIF is a format that provides interoperability between static analysis tools. This means that it decouples the tool that performs the analysis (@monokle/validation, Trivy, Snyk, etc) from the tool that displays the results (Monokle app, Visual Studio Code, GitHub, etc).

SARIF contains both metadata of the tool and the results of the validation. You can learn more about it [here](https://docs.github.com/en/code-security/code-scanning/integrating-with-code-scanning/sarif-support-for-code-scanning).

**Example:**

```json
{
  "$schema": "https://json.schemastore.org/sarif-2.1.0.json",
  "version": "2.1.0",
  "runs": [
    {
      "tool": {
        "driver": {
          "name": "resource-links",
          "rules": [
            {
              "id": "LNK001",
              "name": "no-missing-links",
              "shortDescription": { "text": "Disallow missing links." },
              "fullDescription": {
                "text": "The resource has a reference and it cannot be found. This will likely cause problems during deployments."
              },
              "help": {
                "text": "Check whether the referenced resource is missing or has a typo. The reference are often to labels or a names which depends on the property."
              }
            }
          ]
        }
      },
      "results": [
        {
          "ruleId": "LNK001",
          "rule": {
            "index": 0,
            "toolComponent": { "name": "resource-links" }
          },
          "message": { "text": "Unsatisfied resource link." },
          "locations": [
            {
              "physicalLocation": {
                "artifactLocation": {
                  "uriBaseId": "SRCROOT",
                  "uri": "kustomize-happy-cms/overlays/local/ingress.yaml"
                },
                "region": {
                  "startLine": 17,
                  "startColumn": 23,
                  "endLine": 17,
                  "endColumn": 27
                }
              }
            }
          ]
        }
      ]
    }
  ]
}
```

## Advanced usage

### Preloading

Each validation plugin has to be initialized which might require heavy operations such as fetching large 
JSON schemas, AJV compilation, WASM initialization and more.

The `preload` API avoids a long first validation and is recommended in more interactive environments. 
It is idempotent so you can call it as often as you want without continuously reinstantiating the plugins.

Example:

```typescript
const validator = createDefaultMonokleValidator();
await validator.preload();
await validator.validate({ resources: RESOURCES });
```

### Incremental validation

The `incremental` API gives snappy revalidation when editing resources in and want to give feedback in real-time.

Example:

```typescript
const validator = createDefaultMonokleValidator();

// Initial validation
await validator.validate({
  resources: RESOURCES,
});

// Fast revalidation
await validator.validate({
  resources: RESOURCES,
  incremental: {
    resourceIds: ["some-edited-resource-id"],
  },
});

// Clear incremental caches.
await validator.clear();
```

### Using Community plugins

The Monokle Validator allows you to add custom plugins from [our community repository](https://github.com/kubeshop/monokle-community-plugins). All community plugins are thoroughly reviewed and we take care of loading the plugins for you.

Example to load [annotations](https://github.com/kubeshop/monokle-community-plugins/tree/main/validation/annotations), a community plugin used for demonstrations:

```typescript
const validator = createExtensibleMonokleValidator();

await validator.preload({
  plugins: {
    annotations: true,
  },
});

await validator.validate({ resources: RESOURCES });
```

### Building user interfaces

The validator exposes plugin or rule metadata and their configuration.

This is great if you'd like to bulid a reactive UI around it.

All metadata will be available after preloading the validator.
This way even custom plugins that are downloaded lazily over HTTP have their rules available.

```typescript
const validator = createExtensibleMonokleValidator();

await validator.preload({
  plugins: {
    annotations: true,
  },
});

const { displayName, description, enabled } = validator.metadata.annotations;
console.log(displayName, description, enabled);

for (const { name, configuration } of validator.rules.annotations) {
  console.log(" -", name, configuration.enabled, configuration.level);
}

await validator.validate({ resources: RESOURCES });
```
****
## Caveats

- Use `processRefs` before validating with a _resource-links_ validator. It creates a graph between resources and sees if links between them are present or missing.
- @monokle/validation expects fetch on global scope so please use isomorphic-fetch if this is not available (e.g. NodeJs).
