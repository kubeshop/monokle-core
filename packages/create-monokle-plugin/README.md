# Welcome to Create Monokle Plugin

Use this library to scaffold your custom Monokle validation plugin in seconds. Once implemented the plugin can be used locally or contributed to our [Monokle Community Plugins](https://github.com/kubeshop/monokle-community-plugins) repository. 

Read more about custom plugins in the [Custom Validator documentation](../validation/docs/custom-plugins.md)

## Usage 

This plugin can either be run interactively or with cli arguments.

### Interactive mode

Running in interactive mode:

```shell
npm create monokle-plugin@latest
```

will prompt for:

```shell
✔ Plugin name: … my-validation-plugin
✔ Select a plugin type: › validation
✔ Select a variant: › validation-ts
✔ Select a template: › basic

Scaffolding plugin in /Users/olensmar/WebstormProjects/monokle-core/packages/create-monokle-plugin/my-validation-plugin...

Done. Now run:

  cd my-validation-plugin
  npm install
  npm run dev
```

Now you're all set to implement your [Custom Plugin](../validation/docs/custom-plugins.md)

**Generated Folder Structure**

For typescript plugins, the generated plugin will contain the following files/folders (somewhat depending on the selected template)

```
/src
   /rules       -> contains sample rules
   /schemas
      /crds     -> contains sample CRDs
   plugin.ts    -> defines the plugin
.gitignore
package.json
README.md     
tsconfig.json
```

Check the [templates/validation-ts](templates/validation-ts) folder in this repo to see the actual templates used 
to generate the above.

### Imperative mode 

Use the below syntax to provide all arguments upfront 

```
npm create monokle-plugin@latest my-validator -- --template validation-ts 
```

### Sharing plugins

Head over to the [Monokle Community Plugins](https://github.com/kubeshop/monokle-community-plugins) repo to see existing
community plugins and learn how you can create and share your own.

## Acknowledgements

This project is a modified version of [create-vite](https://github.com/vitejs/vite/tree/main/packages/create-vite) and 
most credits go to them.

<p align="center">
  <img src="docs/images/large-icon-256.png" alt="Monokle Logo" width="128" height="128"/>
</p>

<p align="center">
  <a href="https://github.com/kubeshop/monokle-core/tree/main/packages/validation">
    <img title="mit licence" src="https://img.shields.io/badge/License-MIT-yellow.svg"/>
  </a>
</p>
