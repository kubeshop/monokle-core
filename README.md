<p align="center">
<picture>
  <source media="(prefers-color-scheme: dark)" srcset="assets/MonokleLogoDark.svg">
  <img alt="Monokle light logo" src="assets/MonokleLogoLight.svg">
</picture>
</p>

<p align="center">
  <a href="https://monokle.io">Website</a> |
  <a href="https://kubeshop.github.io/monokle/">Documentation</a> |
  <a href="https://discord.gg/g3pP744AvN">Discord</a> |
  <a href="https://kubeshop.io/blog">Blog</a>
</p>

## Welcome to Monokle core

Monokle core is a monorepository that contains shared packages between Monokle Desktop and Cloud. All packages are open-source and MIT licensed.

## Overview of packages

UI related packages:

- @monokle/components: a shared design system.
- @monokle/tree-navigator: React component to render trees with Redux.

Validation related packages:

- [@monokle/validation](./packages/validation/README.md): An extensible validator for Kubernetes resources.
- [@monokle/cli](./packages/cli/README.md): Validate your Kubernetes resources directly from your terminal.
- [create-monokle-plugin](./packages/create-monokle-plugin/README.md): Bootstrap a custom plugin within seconds.

## Getting involved

- Share ideas, suggestions, bug-reports or complaints on our [Discord server](https://discord.gg/g3pP744AvN).
- Read about how to contribute [in our Documentation](https://kubeshop.github.io/monokle/contributing).
- [Learn about the release process.](./CONTRIBUTING.md)
