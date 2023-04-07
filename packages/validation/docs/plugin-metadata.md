# Validation Plugin Metadata

Monokle Validation Plugins need to provide specific metadata for the validation package to use them in 
the Monokle CLI and Monokle Cloud. 

## Plugin metadata

To ensure correct usage/configuration of your plugin the following
properties should be set in a call to `definePlugin` 

- `id` : a unique (internal) identifier for your plugin
- `name` : a unique camel-case name that will be used as a prefix in configuration files to identify
  rules in the plugin
- `displayName` : a user-friendly name for your plugin
- `description` : a user-friendly description of your plugin

The below example is taken from the Argo Validation plugin in the Community Repository

```typescript
export default definePlugin({
    id: "ARGO",
    name: "argo",
    displayName: "ArgoCD Validation plugin",
    description: "Validation rules related to ArgoCD",
    rules: {
        appDestination, // defined in the example below
        ... more rules ...
    },
});
```

## Validator metadata

Each validator needs to be defined with a call to `defineRule` and added to the `rules` object shown above.  

The following properties are required for `defineRule`

- `id` : an internal id for your rule
- `description` : a text to show if this rule fails
- `help` : a text telling how to fix your errors for this rule 

Another example from the Argo Validation plugin:

```typescript
// used in the example above
export const appDestination = defineRule({
  id: 2,
  description: "Argo Application's destination are mutually exclusive",
  help: "Either use 'server' or 'name', but not both.",
  validate({ resources }, { report }) {
    ... validator implementation ...
    });
  },
});
```

## Usage in validator / CLI configuration

Plugins need to be contributed to the Community Plugins repository to be directly usable with 
the [Monokle CLI](https://github.com/kubeshop/monokle-cli) and Monokle Cloud.

Once contributed you can simple use them by adding them to the `monokle.validation.yaml` file as follows:

```yaml
plugins:
  <plugin-name>: true
rules:
  <pluging-name>/<rule-name>: "err"
```

The `rule-name` is generated from the actual rule property added to the plugin.ts by transforming it into 
a lower cased string with dashes between words.

For the above Argo examples the configuration is

```yaml
# monokle.validation.yaml
plugins:
  argo: true
rules:
  argo/app-destination: "err"
```

Read more about the [Validator Configuration](configuration.md)
