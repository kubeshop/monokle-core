# Monokle Synchronizer

Monokle Synchronizer is a TypeScript library to provide integration with Monokle Cloud in local environments.

This package exposes two main utils - `Authenticator` and `Synchronizer` which can be used for authenticating with Monokle Cloud and then synchronizing remote policies to local environment.

## Authenticator

Authenticator provides a way to authenticate locally with Monokle Cloud. It can be done via *device flow* or by providing *access token*. In both scenarios as a result, API token is obtained and stored locally so can be used for further Monokle Cloud API communication (for synchronizing policies).

### Login flow

Login is a two step process, where `authenticator.login(...)` call initializes login flow and return an object with `onDone` promise which gets resolve when user is successfully logged in.

Login via device flow - this is a 2-step process where user needs to navigate ot given URL using a browser to authenticate:

```ts
import {createDefaultMonokleAuthenticator} from '@monokle/synchronizer';

const authenticator = createDefaultMonokleAuthenticator();

const loginResponse = await authenticator.login('device code');

console.log(loginResponse.handle);
// The `loginResponse.handle` is an object containing an URL which needs to be shown to users so they can authenticate with it in a browser.
// handle.device_code: string;
// handle.verification_uri_complete: string;

const user = await loginResponse.onDone;
// Returns
// user.isAuthenticated
// user.email
// user.token
```

Login via access token - this is 1-step process where user should be prompted first for a token and then this token should be passed to `login` method:

```ts
import {createDefaultMonokleAuthenticator} from '@monokle/synchronizer';

const authenticator = createDefaultMonokleAuthenticator();

const loginResponse = await authenticator.login('token', 'sample user token');
const user = await loginResponse.onDone;
// Returns
// user.isAuthenticated
// user.email
// user.token
```

On successful login, `authenticator` instance emits `login` event with object including user data and login method used:

```ts
{
  method: 'token'
  user: {...}
}
```

**IMPORTANT**: Keep in mind that `User` instance is immutable. To make sure you always have up to date user data, always use `authenticator.user` instead of passing around sole `User` object.

### Logout

```ts
import {createDefaultMonokleAuthenticator} from '@monokle/synchronizer';

const authenticator = createDefaultMonokleAuthenticator();

await authenticator.logout();
```

This emits `logout` event.

### Token refresh

When using *device flow*, user token gets expired with time and needs to be refreshed. The recommended way is to always use `authenticator.getUser()` method which returns `User` but also takes care of refreshing token internally.

```ts
import {createDefaultMonokleAuthenticator} from '@monokle/synchronizer';

const authenticator = createDefaultMonokleAuthenticator();

const user = await authenticator.getUser();
```

Since `getUser()` is async, there might be scenarios where it cannot be used to obtain user data. Then `authenticator.user` getter should be used. In such scenarios, token refreshing needs to be taken of separately by calling `authenticator.refreshToken()`. Since this method will only refresh user token when it is close to being expired it doesn't have any additional surrounding logic and can be called every time before policies synchronization logic.

## Synchronizer

Synchronizer is an util to synchronize and get content of remote polices. The simplest way is to use `synchronizer.getPolicy()` method. The git repository for which to get policies can be passed both as path to local folder or specifying required git data.

```ts
import {createDefaultMonokleSynchronizer} from '@monokle/synchronizer';

const synchronizer = createDefaultMonokleSynchronizer();

// By path
const policy = await authenticator.getPolicy('/home/kubeshope/...');

// By repo data
const policy = await authenticator.getPolicy({
  provider: 'github',
  remote: 'origin',
  owner: 'kubeshop',
  name: 'monokle-core',
});

console.log(policy);
// {
//   valid: boolean; // if policy is valid
//   path: string; // full path to local .yaml policy file
//   policy: StoragePolicyFormat; // entire policy content as JSON file
// }
```

Depending on the use case you may use policy JSON directly or pass `path` to any other tool (like `@monokle/validator`) which can read the file.

The above will only return valid policy if it was synchronized before. Synchronization can be done separately or as a part of `getPolicy()` call:

```ts
import {createDefaultMonokleSynchronizer} from '@monokle/synchronizer';

const synchronizer = createDefaultMonokleSynchronizer();

// Force policy synchronization by passing `forceRefetch=true` and user access token:
const policy = await authenticator.getPolicy('/home/kubeshope/...', true, authenticator.user.token);

// Or do separate calls like:
await authenticator.synchronize('/home/kubeshope/...', authenticator.user.token);

const policy = await authenticator.getPolicy('/home/kubeshope/...');
```

Every time policy is synchronized (both via `synchronize()` call or `getPolicy()` with `forceRefetch=true` call), `synchronize` event will be emitted with policy object.

## Error handling

Most of the `Authenticator` and `Synchronizer` top level methods will just throw errors when something unexpected happens, so it's a good idea to have some error handling in place.
