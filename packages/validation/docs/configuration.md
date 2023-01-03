## Monokle Validation configuration

The monokle validator uses a shared configuration file providing a consistent experience no 
matter if you validate from the CLI, GitHub Action or either of our applications (desktop & web).

The configuration format is heavily inspired by ESLint and aims to be flexible and configurable for your use case. You can turn off every rule and run only with basic syntax validation or mix and match the bundled rules and your custom rules to fit the needs of your project.

A basic example looks like this:

```yaml
plugins:
  yaml-syntax: true
  kubernetes-schema: true
rules:
  yaml-syntax/no-bad-alias: "warn"
  yaml-syntax/no-bad-directive: false
  open-policy-agent/no-last-image: "err"
  open-policy-agent/cpu-limit: "err"
  open-policy-agent/memory-limit: "err"
  open-policy-agent/memory-request: "err"
settings:
  kubernetes-schema:
    schemaVersion: v1.24.2
```

## Table of contents

- [Usage](#usage)
  - [Create your configuration file](#create-your-configuration-file)
  - [Enable/disable a plugin](#enabledisable-a-plugin)
  - [Enable/disable a rule](#enabledisable-a-rule)
  - [Configure the settings of a plugin](#configure-the-settings-of-a-plugin)

## Usage

### Create your configuration file

You should create a `monokle.validation.yaml` file in your repository's root.

### Enable/disable a plugin

A `boolean` indicates whether the plugin is enabled or disabled.

The four core plugins are enabled by default.

```yaml
plugins:
  kubernetes-schema: true
  open-policy-agent: false
```

Any additional plugins found in a  `.monokle-plugins` folder below the cwd of where you are running the validator/CLI and
it will be available to configure and use as described under

### Enable/disable a rule

A `boolean` indicates whether the rule is enabled or disabled.

You can also use `"err"` or `"warn"` to enable a rule at that given level.

By default a rule will be enabled as a warning,

```yaml
rules:
  open-policy-agent/no-last-image: false
  open-policy-agent/cpu-limit: "err"
  open-policy-agent/memory-limit: "err"
  open-policy-agent/memory-request: true
```

Below you can find an overview of all the plugins with their available rules.

### Configure the settings of a plugin

The settings are a global object that are available to all rules.

The settings object is unstructured and each plugin should describe its settings.

To avoid variable name clashes, plugins usually scope their settings under their name by convention as seen in the example below:

```yaml
settings:
  debug: true
  kubernetes-schema:
    schemaVersion: v1.24.2s
```

Below you can find an overview of all the plugins with their available settings.

