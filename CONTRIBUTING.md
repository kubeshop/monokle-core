# Contributing

## How to create a release

**Summary**

1. `npx changeset` before each PR and commit the generated files.
2. Merge your feature's PR as normal and it will create a "Version Packages" PR.
3. Merge the "Version Packages" PR and it will publish the release.

**npx changeset**

You probably created a fix or feature which is why you want to create a release. The first step is creating a changelog entry. `npx changeset` will guide you in this process by prompting you for (1) the relevant packages, (2) the desired version bump (major|minor|patch), and (3) a description of the entry.

This is the only manual step. The CI pipeline will take it from here.
