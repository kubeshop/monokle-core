# Monokle validation

Flexible validation of Kubernetes resources.

## Getting started

Start by installing the validator to your codebase:

```
npm install @monokle/validation
```

Afterwards you can use the validator with defaults as follows:

```typescript
const validator = createDefaultMonokleValidator();
await validator.validate({ resources: RESOURCES });
```

This will lazily load the plugins before validating and you don't have to worry about anything.
You might want to customize the configuration. The validator supports three levels of configuration: 1) default, 2) configuration file, and 3) arguments. The former levels get overridden by the latter.

```typescript
const validator = createDefaultMonokleValidator();
await validator.configureFile({ plugins: { "kubernetes-schema": false } });
await validator.configureArgs({ plugins: { "kubernetes-schema": true } });
await validator.validate({ resources }); // kubernetes-schema is validated.
```

## Configure

Monokle Validator's configuration is heavily inspired by ESLint.

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

The configuration object is made up of these properties:

- **plugins:** an object containing a name-value mapping of plugin names to booleans. The boolean indicates whether the plugin is enabled or disabled.
- **rules:** an object containing the configured rules. The rule configuration indicates whether the rule is enabled or disabled and can customize it's log level.
- **settings:** an object containing name-value pairs of information that should be available to all rules.

## The validation response

The response uses [Static Analysis Results Interchange Format (SARIF)](https://docs.oasis-open.org/sarif/sarif/v2.1.0/csprd01/sarif-v2.1.0-csprd01.html).

SARIF is a format that provides interoperability between static analysis tools. This means that it decouples the tool that performs the analysis (@monokle/validation, Trivy, Snyk, etc) from the tool that displays the results (Monokle app, Visual Studio Code, GitHub, etc).

You can learn more about it [here](https://docs.github.com/en/code-security/code-scanning/integrating-with-code-scanning/sarif-support-for-code-scanning).

## Advanced usage

### Preloading

The plugins have to be initialized which might require heavy operations such as fetching large JSON schemas, AJV compilation, WASM initialization and more.

The `preload` API avoids a long first validation and is recommended in more interactive environments.

Examples:

```typescript
// Default usage with preload
const validator = createDefaultMonokleValidator();
await validator.preload();
await validator.validate({ resources: RESOURCES });

// Custom usage with preload
const validator = createDefaultMonokleValidator();
validator.configureArgs(ARGS);
validator.configureFile(FILE);
await validator.preload();
await validator.validate({ resources: RESOURCES });

// Alternative custom usage with preload
const validator = createDefaultMonokleValidator();
await validator.preload({ file: FILE, args: ARGS );
await validator.validate({ resources: RESOURCES });
```

The preload API will be awaited by `validate` to always ensure latest configuration:

```typescript
const validator = createDefaultMonokleValidator();
validator.preload({ file: LATEST_FILE );
await validator.validate({ resources: RESOURCES }); // ensures LATEST_FILE
```

The preload API will also abort an ongoing validation as it's likely stale:

```typescript
const validator = createDefaultMonokleValidator();
try {
  await validator.validate({ resources: RESOURCES });
} catch (err) {
  if (err instanceof AbortError) {
    console.log("aborted");
  }
}

// In a different tick
await validator.preload({ file: FILE, args: ARGS );

// Expected output: "aborted"
```

### Custom plugins

The `pluginLoader` API can be used to change the

```typescript
const validator = createMonokleValidator(async (name) => {
  switch (name) {
    case "custom-plugin":
      return new CustomValidator();
    default:
      return createDefaultPluginLoader()(name);
  }
}, DEFAULT_CONFIG);

validator.configureArgs({
  plugins: {
    "custom-plugin": true,
  },
  settings: {
    "custom-plugin": {
      "some-param": 42
    }
  }
});

await validator.validate({ resources });
```

## Caveats

- Use `processRefs` before validating with a _resource-links_ validator. It creates a graph between resources and sees if links between them are present or missing.
- @monokle/validation expects fetch on global scope so please use isomorphic-fetch if this is not available (e.g. NodeJs).
