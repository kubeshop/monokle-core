# Monokle custom validator

Welcome to Monokle custom validation plugin.

Developing a plugin has is build with developer experience in mind and has a short feedback loop. Read more below.

## Development

To start development you should enable the development server with `npm run dev`.

Afterwards you can open [app.monokle.com](https://app.monokle.com) and open the validation pane in your favourite repository. A new validator labelled "development" will appear.

You can now start editing code, the development server will automatically pick up code changes and forward it to the browser where Hot Module Replacement will give you the latest version of your code in real-time. You can play around with any of the resources in your project to make sure you got the validation right.

### Generating type guard for CRDs

The main use case for custom validators are adding validation to your custom resource definitions. To improve the developer experience, our tooling includes a small utility to generate types and type guards from CustomResourceDefinition resources.

Simply drop your YAML file that defines the CRD into the _src/crds_ directory and run `npm run codegen` or `npm install` (it runs on a post-install hook as well).

Example usage:

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

## Distribution

Simply create a pull request to monokle-community-plugins and our pipelines will take care of everything!
