## How to develop

For now manually install because linking does not work out of the box for Vite and workers..

The flow is not the fastest but it works and wrapped as one-liners they are ok to get to POC.

## Start Verdaccio

```
vedaccio
```

## Publish to Verdaccio

This will increase the patch version, build the library and publish it to Verdaccio.

```
npx json-bump package.json && npm run build && npm publish --registry http://localhost:4873
```

## Install in Monokle Cloud

This will force install the latest version of the library.

```
npm add monaco-monokle@latest --registry http://localhost:4873
```

Now stop `npm run dev` and start it again will rebundle it. You will notice the app load and reboot with a black screen which is Vite's bundler kicking in to process the worker that got reloaded.

## Install in Argo CD

WARNING uses `yarn` and not `npm

```
yarn add monaco-monokle@latest --registry http://localhost:4873
```

Now stop `npm run dev` and start it again will rebundle it. You will notice the app load and reboot with a black screen which is Vite's bundler kicking in to process the worker that got reloaded.
