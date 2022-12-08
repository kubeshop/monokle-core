<p align="center">
  <img src="docs/images/large-icon-256.png" alt="Monokle Logo" width="128" height="128"/>
</p>

<p align="center">
<a href="https://github.com/features/actions">Monokle toolkit</a>
for <a href="">developer experience</a>
</p>

<p align="center">
  <a href="https://github.com/kubeshop/monokle-core/tree/main/packages/validation">
    <img title="mit licence" src="https://img.shields.io/badge/License-MIT-yellow.svg"/>
  </a>
</p>

## Welcome to Monokle CLI

Monokle plugin toolkit is an internal package for development of custom validation plugins. It is
used in the package.json scripts created by the [create-monokle-plugin](../create-monokle-plugin) scaffolding 
tool to provide the following commands:

- `build` : Builds a plugin for distribution
- `dev` : Starts a Monokle plugin development server to be used with Monokle Clouds development mode for plugins
- `codegen` : Generates types for known Kubernetes kinds and CRDs (from a `src/schemas/crds` folder)

Head over to the [Monokle Community Plugins](https://github.com/kubeshop/monokle-community-plugins) repository to 
learn more about custom validation plugins.
