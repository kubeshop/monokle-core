# @monokle/synchronizer

## 0.14.2

### Patch Changes

- ad6a15c: Fixed synchronization cache

## 0.14.1

### Patch Changes

- 94d4b02: Suppression location can now be passed 'toggleSuppression' API

## 0.14.0

### Minor Changes

- fc929fe: introduced ProjectSynchronzier to allow fetching all project data at once

## 0.13.0

### Minor Changes

- 7126eb4: Add mechanism to pass client identity config with every API request

## 0.12.5

### Patch Changes

- 1119919: Added explicit timeout to conifg request

## 0.12.4

### Patch Changes

- cdfe62d: Improve origin config fetching by assuring response status and using https as default proto.

## 0.12.3

### Patch Changes

- 4b6b812: Added 'schemasOrigin' as predefined 'OriginConfig' key

## 0.12.2

### Patch Changes

- 25b86ff: Improved project matching logic.
- 1a5a238: Clear auth user data on origin conflict by default

## 0.12.1

### Patch Changes

- 3bbb688: Add explicit timeouts for API communication

## 0.12.0

### Minor Changes

- 69fb68a: Introduced method to fetch origin config

## 0.11.0

### Minor Changes

- 6812547: Allow synchronization with explicit project slug

## 0.10.2

### Patch Changes

- 3eae996: Add missing Fetcher global export
- e51b791: Use default API URL in ApiHandler when falsy value passed

## 0.10.1

### Patch Changes

- db453c1: Add missing fetcher export

## 0.10.0

### Minor Changes

- caea9d4: Introduced util for direct API querying

## 0.9.1

### Patch Changes

- 7838f08: Added more explicit GraphQL API error handling

## 0.9.0

### Minor Changes

- 8d03837: Require token object instead of string for API queries

## 0.8.0

### Minor Changes

- 8e49957: add get suppressions query in the synchronizer package

### Patch Changes

- Updated dependencies [8e49957]
  - @monokle/types@0.2.1

## 0.7.0

### Minor Changes

- 1a75af3: Exposed API to get policy by project slug

## 0.6.0

### Minor Changes

- d792c1e: Introduced synchronizer `getProjectInfo()` method

## 0.5.0

### Minor Changes

- e62281c: Added option to force refresh token

### Patch Changes

- a8cb9f9: Imporved error handling

## 0.4.0

### Minor Changes

- ea181e4: Introduced more specific 'generateDeepLink\*' methods

### Patch Changes

- 9019f2e: Fixed token refresh logic

## 0.3.1

### Patch Changes

- f65c476: Migrated to '@monokle/types'
- 9b6ba48: Fixed invalid git URL parsing
- Updated dependencies [d085cd3]
  - @monokle/types@0.2.0

## 0.3.0

### Minor Changes

- f85b47d: Changed default device flow handler configuration to prod env

## 0.2.0

### Minor Changes

- 66a293e: Improve 'DeviceFlowHandler' configurability

## 0.1.0

### Minor Changes

- 0b15757: Introduce `synchronizer` package to allow integration with Monokle Cloud.
