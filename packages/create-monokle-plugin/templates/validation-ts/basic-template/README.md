# Monokle Custom Validator

Welcome to your Monokle custom validation plugin!

Follow these steps to get going:

- Update the generated `src/plugin.ts` file with correct metadata ([read more](#plugin-metadata))
- Implement your rule(s) in the `src/rules` folder and make sure to add them to the `src/plugin.ts` file
- Optionally use Monokle Cloud to test your plugin ([see below](#local-development-with-monokle-cloud))
- If you want to share your plugin with the community, fork and add it to the [Monokle Community Plugins](https://github.com/kubeshop/monokle-community-plugins) 
  repository, and open a PR back to the repository for us to review and merge.
- Update this README as desired (if you plan to share the code/repo containing it).

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

### Generate Resources

Put any CRDs you might want to use/validation in the `src/schemas/crds` folder (in JSON format) and run

```
npm run codegen
```

This will generate utility methods and types for each CRD into the `src/schemas/__generated__` folder, for you
to import/use in your validators.

### Packaging

To package your plugin into a single `plugin.js` file, run

```
npm run build
```

which will create a `dist/plugin.js` file in your repo.

> NOTE: We will do all packaging/deployment for you if you submit your plugin to
the [Monokle Community Plugins](https://github.com/kubeshop/monokle-community-plugins) repository.  
