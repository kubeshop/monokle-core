# Custom Validation Plugins

Monokle Validation plugins can currently be written in typescript and scaffolded using the 
[create-monokle-plugin](../create-monokle-plugin) library. 

- [Getting Started](#getting-started)
- Documentation
  - [Plugin Metadata](plugin-metadata.md) describes the metadata a plugin needs to expose
  - [Rule Implementation](rule-implementation.md) shows how to implement rules
- Tips & Tricks
  - [Local Development with Monokle Cloud](#local-development-with-monokle-cloud)
  - [Generate Resources & Typeguards](#generate-resources--typeguards)
  - [Packaging](#packaging)
  - [Sharing & Distribution](#sharing-and-distribution)

## Getting Started

Follow these steps to get going with a custom plugin:

1. Use [create-monokle-plugin](../../create-monokle-plugin) to scaffold your plugin
2. Update the generated `src/plugin.ts` file with correct metadata - [read more](plugin-metadata.md)
3. Optionally add any CRDs that you might want to validate to the `src/schemas` folder and generate corresponding objects - [see below](#generate-resources--typeguards)
4. [Implement your rule(s)](rule-implementation.md) in the generated `src/rules` folder and make sure to add them to the `definePlugin` call in the generated`src/plugin.ts` file
5. Optionally use Monokle Cloud to test your plugin ([see below](#local-development-with-monokle-cloud))
6. Package and/or share your plugin in our [Monokle Community Plugins](https://github.com/kubeshop/monokle-community-plugins) repository.

## Tips & Tricks

### Local Development with Monokle Cloud

To enable direct testing/debugging of your validators with Monokle Cloud, run 

```
npm run dev
```

which will start a local development server that Monokle Cloud can connect to:

- Open [app.monokle.com](https://app.monokle.com) and open the validation pane in your favourite repository.
- Enabled "Development Mode" at the bottom of the pane
- A new validator labelled "development" will appear.

You can now start editing code; the local development server will automatically pick up code changes and forward 
them to the browser where Hot Module Replacement will give you the latest version of your code in real-time. 
You can play around with any of the resources in your project to make sure you got the validation right.

### Generate Resources & Typeguards

Put any CRDs you might want to use/validation in the `src/schemas/crds` folder (in JSON format) and run

```
npm run codegen
```

This will generate utility methods and types for each CRD into the `src/schemas/__generated__` folder, for you 
to import/use in your validators.

Example usage for code generated for the prometheus CRD:

```typescript
defineRule({
  validate({ resources } {
    resources
      .filter(r => isPrometheus(r.content))
      .forEach(prometheus => {
        prometheus.content.spec; // this is now a fully typed object.
      })
  }
})
```

### Packaging & Usage

To package your plugin into a single `plugin.js` file, run

```
npm run build
```

which will create a `dist/plugin.js` file in your repo. 

Put this file in a `.monokle-plugins` folder below the cwd of where you are running the validator/CLI and 
it will be available to configure and use as described under 


### Sharing and Distribution

If you want to share your plugin with the community, fork and add it to the
[Monokle Community Plugins](https://github.com/kubeshop/monokle-community-plugins)
repository, and open a PR back to the repository for us to review and merge.







