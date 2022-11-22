# Contributing

## How to create a release

**Summary**

1. `npx changeset` before each PR and commit the generated files.
2. Merge your feature's PR as normal and it will create a "Version Packages" PR.
3. Merge the "Version Packages" PR and it will publish the release.

**1. Create changelog entry with changeset**

You probably created a fix or feature which is why you want to create a release. The first step is creating a changelog entry. `npx changeset` will guide you in this process by prompting you for (1) the relevant packages, (2) the desired version bump (major|minor|patch), and (3) a description of the entry.

This is the only manual step. The CI pipeline will take it from here.

**2. Merge PR as normal**

**3. The "Version Packages" pull request**

You do not need to merge this every time you merge your feature branch. You might for example want to group several features and bugfixes together. Changeset will automatically update the Version Packages PR and once you are ready you can press merge to publish to NPM.
