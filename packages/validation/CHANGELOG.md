# @monokle/validation

## 0.32.1

### Patch Changes

- 4fc3634: Fix taxonomies

## 0.32.0

### Minor Changes

- 6b60086: add srcroot configuration

## 0.31.8

### Patch Changes

- f5cfcbf: Improve Kubernetes Schema rules

## 0.31.7

### Patch Changes

- f56eea8: Add schema loader config

## 0.31.6

### Patch Changes

- 5a47018: fix plugin bundle loader

## 0.31.5

### Patch Changes

- 7f6f3c2: Fix rules KBP107/no-pod-create and KBP108/no-pod-execute
- Updated dependencies [367ef4a]
  - @monokle/types@0.3.0

## 0.31.4

### Patch Changes

- 0af6ba5: Add key to metadata yaml path

## 0.31.3

### Patch Changes

- e8c7c6d: fix(core/validation): fix missing import extensions

## 0.31.2

### Patch Changes

- 8d71abd: Handle messageExpression

## 0.31.1

### Patch Changes

- a2f0b07: Added crds x-kubernetes-validation validate of custom resources

## 0.31.0

### Minor Changes

- b09521c: Add ValidatingAdmissionPolicy references

### Patch Changes

- 5d3a3ba: fix regression in PSS202
- da06582: Add admission policy basic version

## 0.30.1

### Patch Changes

- 739ab86: Polish autofix

## 0.30.0

### Minor Changes

- c317d85: add pss autofixes

## 0.29.1

### Patch Changes

- 410cc01: Fixed lodash imports
- Updated dependencies [393090b]
  - @monokle/types@0.2.2

## 0.29.0

### Minor Changes

- efe313b: Improved autofix

## 0.28.2

### Patch Changes

- 3a19a93: fix validation remote plugin loader

## 0.28.1

### Patch Changes

- 8e49957: add get suppressions query in the synchronizer package
- Updated dependencies [8e49957]
  - @monokle/types@0.2.1

## 0.28.0

### Minor Changes

- d6d1728: add autofixes

## 0.27.0

### Minor Changes

- ce76d66: add `isPendingSuppression` utility function

## 0.26.0

### Minor Changes

- d2bcf16: Fingerprint suppressions

## 0.25.4

### Patch Changes

- f2ad727: Fixed SARIF result 'automationDetails.guid' format

## 0.25.3

### Patch Changes

- f65c476: Migrated to '@monokle/types'
- Updated dependencies [d085cd3]
  - @monokle/types@0.2.0

## 0.25.2

### Patch Changes

- 4e16e2e: Fix annotations query

## 0.25.1

### Patch Changes

- db65010: remove react-fast-compare to fix build

## 0.25.0

### Minor Changes

- 80f938d: Add SARIF baseline comparison and in source suppressions

## 0.24.2

### Patch Changes

- 006894a: fix imports
- 88eb61b: fix folder import

## 0.24.1

### Patch Changes

- 9c55446: Fix volume-types rule

## 0.24.0

### Minor Changes

- 7314d5c: load custom plugins using `settings.[plugin-name].pluginUrl`

## 0.23.9

### Patch Changes

- 2771579: Fix `toolComponent` index check in `getRuleForResultV2()` function

## 0.23.8

### Patch Changes

- f538ec4: Fixed 'readConfig()' function to parse settings

## 0.23.7

### Patch Changes

- dbc44fa: Make '...toolComponent.index' optional

## 0.23.6

### Patch Changes

- d685240: Add missing '...toolComponent.index' to SARIF output

## 0.23.5

### Patch Changes

- a9c990d: correct Pod Security Standards abbreviation

## 0.23.4

### Patch Changes

- 896c1bb: Fix invalid (but not breaking) imports

## 0.23.3

### Patch Changes

- 28bb741: Fix validation export type

## 0.23.2

### Patch Changes

- c79028e: Fixed export of util function

## 0.23.1

### Patch Changes

- 0079d28: Additional exports for utility functions

## 0.23.0

### Minor Changes

- 7e161d6: Add 'dynamic' flag to rule definition

## 0.22.0

### Minor Changes

- 4314a87: extend rules definition with config metadata

## 0.21.1

### Patch Changes

- 113d03a: Added new customPluginLoader parameter

## 0.21.0

### Minor Changes

- 7d12c6f: Fix validation package version

## 0.20.1

### Patch Changes

- 1b15e70: Fixed Node exports

## 0.20.0

### Minor Changes

- d249885: introduce metadata validation plugin

## 0.19.2

### Patch Changes

- 1151a9a: Export CORE_PLUGINS constant

## 0.19.1

### Patch Changes

- b719433: Fix validation imports

## 0.19.0

### Minor Changes

- 04c222d: introduce 'strict-mode-violated' validation rule

## 0.18.0

### Minor Changes

- f0a2fff: introduce 'apiVersion' deprecation rules
- f28a2fc: add rule configuration

## 0.17.4

### Patch Changes

- 7c4ad04: fix pss rule enabled

## 0.17.3

### Patch Changes

- e2e1580: Fix default rule config

## 0.17.2

### Patch Changes

- 2eabe7b: fix: fix custom validator relationships

## 0.17.1

### Patch Changes

- 3923ea1: fix: fix build

## 0.17.0

### Minor Changes

- b1e45ea: Rework tool and add PSS & KBP plugins

## 0.16.0

### Minor Changes

- cd94545: Fix publish

## 0.15.5

### Patch Changes

- f14454c: Update yaml package

## 0.15.4

### Patch Changes

- f7ebe2b: Fix ownerReference import

## 0.15.3

### Patch Changes

- 587b9e9: Use react-fast-compare

## 0.15.2

### Patch Changes

- d4ebd2f: Fix import

## 0.15.1

### Patch Changes

- 4b16c29: Fix argo build

## 0.15.0

### Minor Changes

- e0544e9: validation: isolate node/browser entrypoints

### Patch Changes

- 020f308: Fix legacy builds

## 0.14.0

### Minor Changes

- a51260a: configure subpath imports for isolating node and browser code

## 0.13.0

### Minor Changes

- 4572b9e: refactor: load custom plugins through `require` instead of `import`

## 0.12.1

### Patch Changes

- 0dab4a1: Fix schema loader

## 0.12.0

### Minor Changes

- 8056fa3: Improve YAML plugin

## 0.10.3

### Patch Changes

- 3b72cf9: Fix getRelated in kustomizations

## 0.10.2

### Patch Changes

- 59ad72e: fix cli build

## 0.10.1

### Patch Changes

- ab4d567: Add template with toolkit and fix minor bug

## 0.10.0

### Minor Changes

- 521529e: Improved resource-links validator to support optional links + bug-fixes in YAML and OPA validators

### Patch Changes

- 034573b: Add monokle-plugin-toolkit

## 0.9.1

### Patch Changes

- 62ca8ec: Fix type inference

## 0.9.0

### Minor Changes

- 77e9fe0: Improve custom plugins

## 0.8.1

### Patch Changes

- f6c93fc: Fix default rule config

## 0.8.0

### Minor Changes

- 57a6ba6: Add methods to transfer state
