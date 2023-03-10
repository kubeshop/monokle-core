<p align="center">
  <img src="packages/validation/docs/images/large-icon-256.png" alt="Monokle Logo" width="128" height="128"/>
</p>

# Welcome to Monokle Core

Monokle core is a monorepository that contains shared packages between [Monokle Desktop](https://github.com/kubeshop/monokle) and [Monokle Cloud](https://app.monokle.com). 
All packages are open-source and MIT licensed.

## Validation Packages

Monokle uses a common set of libraries for validation Kubernetes resources across its CLI, Desktop and Cloud tooling.

- [@monokle/validation](./packages/validation): An extensible validator for Kubernetes resources.
- [@monokle/cli](https://github.com/kubeshop/monokle-cli): A CLI to validate your Kubernetes resources directly from your terminal.
- [create-monokle-plugin](./packages/create-monokle-plugin): Bootstrap a custom plugin within seconds.

Please go to the [Monokle Community Plugins](https://github.com/kubeshop/monokle-community-plugins) repo for information
on how to create and share your own validators.

## UI related packages:

- @monokle/components: a shared design system.
- @monokle/tree-navigator: React component to render trees with Redux.

## Other Packages

- monaco-kubernetes: A Kubernetes language plugin for Monaco.

## Getting involved

- Share ideas, suggestions, bug-reports or complaints on our [Discord server](https://discord.gg/g3pP744AvN).
- Read about how to contribute [in our Documentation](https://kubeshop.github.io/monokle/contributing).
- [Learn about the release process.](./CONTRIBUTING.md)
