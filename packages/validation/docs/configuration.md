<p align="center">
  <img src="images/large-icon-256.png" alt="Monokle Logo" width="128" height="128"/>
</p>

<p align="center">
<a href="https://github.com/kubeshop/monokle-core/blob/add-validation-docs/packages/validation/docs/configuration.md">Shared configuration</a> for <a href="https://github.com/kubeshop/monokle-core/blob/add-validation-docs/packages/validation">consistent validation</a>
</p>

<p align="center">
  <a href="https://github.com/kubeshop/monokle-core/tree/main/packages/validation">
    <img title="mit licence" src="https://img.shields.io/badge/License-MIT-yellow.svg"/>
  </a>
</p>

## Welcome to Monokle Validation configuration

Our validator uses a shared configuration file.

It gives a consistent experience no matter if you validate from the CLI, GitHub Action or either of our applications (desktop & web).

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

## Table of content

- [Welcome to Monokle Validation configuration](#welcome-to-monokle-validation-configuration)
- [Table of content](#table-of-content)
- [Usage](#usage)
  - [Create your configuration file](#create-your-configuration-file)
  - [Enable/disable a plugin](#enabledisable-a-plugin)
  - [Enable/disable a rule](#enabledisable-a-rule)
  - [Configure the settings of a plugin](#configure-the-settings-of-a-plugin)
- [Core plugins](#core-plugins)
  - [Open Policy Agent](#open-policy-agent)
  - [Kubernetes Schema](#kubernetes-schema)
  - [Resource Links](#resource-links)
  - [YAML Syntax](#yaml-syntax)

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

## Core plugins

There are four cores plugins:

- Open Policy agent
- Kubernetes Schema
- Resource links
- YAML Syntax

By default plugins are enabled and all rules are enabled as a warning.

### Open Policy Agent

A collection of security rules.

Under the hood it compiles Rego policies into a WebAssembly module that handles the validation. A big shout out to the DefSec team at [Aqua Security](https://www.aquasec.com/) as full credit for these rules goes to them. You can find the source of their Rego policies [here](https://github.com/aquasecurity/defsec).

There are no settings for this plugin.

```yaml
plugins:
  open-policy-agent: true
```

**Rules**

| id     | name                                        | description                                             |
| ------ | ------------------------------------------- | ------------------------------------------------------- |
| KSV001 | open-policy-agent/no-elevated-process       | Disallow the process from elevating its privileges.     |
| KSV002 | open-policy-agent/app-armor                 | Require a default AppArmor profile                      |
| KSV003 | open-policy-agent/drop-capabilities         | Require default capabilities to be dropped              |
| KSV005 | open-policy-agent/no-sys-admin              | Disallow the SYS_ADMIN capability                       |
| KSV006 | open-policy-agent/no-mounted-docker-sock    | Disallow mounteing the hostPath volume with docker.sock |
| KSV008 | open-policy-agent/no-host-ipc               | Disallow access to host IPC namespace                   |
| KSV009 | open-policy-agent/no-host-network           | Disallow access to host network                         |
| KSV010 | open-policy-agent/no-host-pid               | Disallow access to host PID                             |
| KSV011 | open-policy-agent/cpu-limit                 | Require the CPU to be limited                           |
| KSV012 | open-policy-agent/run-as-non-root           | Requires the container to runs as non root user         |
| KSV013 | open-policy-agent/no-latest-image           | Disallow images with the latest tag                     |
| KSV014 | open-policy-agent/no-writable-fs            | Require a read-only root file system                    |
| KSV015 | open-policy-agent/cpu-request               | Require the CPU to be requested                         |
| KSV016 | open-policy-agent/memory-request            | Require the memory to be requested                      |
| KSV017 | open-policy-agent/no-privileged             | Disallow the use of privileged containers               |
| KSV018 | open-policy-agent/memory-limit              | Require the memory to be limited                        |
| KSV020 | open-policy-agent/no-low-user-id            | Disallow running with a low user ID                     |
| KSV021 | open-policy-agent/no-low-group-id           | Disallow running with a low group ID                    |
| KSV023 | open-policy-agent/no-host-mounted-path      | Disallow mounting hostPath volumes                      |
| KSV024 | open-policy-agent/no-host-port-access       | Disallow accessing the host ports                       |
| KSV025 | open-policy-agent/no-selinux                | Disallow custom SELinux options                         |
| KSV027 | open-policy-agent/no-proc-mount             | Disallow setting proc masks                             |
| KSV028 | open-policy-agent/no-non-emphemeral-volumes | Disallow use of non-ephemeral volume types              |
| KSV029 | open-policy-agent/no-root-group             | Disallow setting runAsGroup to zero.                    |
| KSV030 | open-policy-agent/seccomp-profile           | Require a Seccomp profile                               |

### Kubernetes Schema

Validates whether the Kubernetes resources comply with a JSON schema.

There are no settings for this plugin.

```yaml
plugins:
  kubernetes-schema: true
settings:
  kubernetes-schema:
    schemaVersion: "v1.25.1"
```

| name          | description                          | default   |
| ------------- | ------------------------------------ | --------- |
| schemaVersion | The version of the Kubernetes schema | "v1.24.2" |

**Rules**

| id     | name                              | description                           |
| ------ | --------------------------------- | ------------------------------------- |
| K8S001 | kubernetes-schema/schema-violated | The resource is formated incorrectly. |

### Resource Links

Validates whether links/references between resources are valid - i.e. if the target
object exists or not. 

This plugin has two rules; one for standard link validation, and another
for optional link validation (disabled by default)

For example - the configMapKeyRef below is set as optional; if the target
configMap does not exist this would be ignored by the validator, unless the 
LNK002 rule is enabled.

```yaml
    env:
      - name: SOME_VALUE
        valueFrom:
          configMapKeyRef:
            name: some-configmap-name
            key: some-key
            optional: true
```

**Rules**

| id     | name                                     | description                      |
|--------|------------------------------------------|----------------------------------|
| LNK001 | resource-links/no-missing-links          | Disallow missing links.          |
| LNK002 | resource-links/no-missing-optional-links | Disallow missing optional links. |

### YAML Syntax

Validate whether the resource uses proper YAML syntax.

There are no settings for this plugin.

```yaml
plugins:
  yaml-syntax: true
```

**Rules**

Generally you either want all of these to be enabled or disabled.

| id     | name                                  | description                                   |
| ------ | ------------------------------------- | --------------------------------------------- |
| YML001 | yaml-syntax/alias-props               | The alias props are incorrect.                |
| YML002 | yaml-syntax/no-bad-alias              | The alias' format is incorrect.               |
| YML003 | yaml-syntax/no-bad-directive          | The directive is incorrect.                   |
| YML004 | yaml-syntax/no-bad-dq-escape          | The double quotes are escaped incorrectly.    |
| YML005 | yaml-syntax/no-bad-indent             | The indentation is incorrect.                 |
| YML006 | yaml-syntax/no-bad-prop-order         | The anchors and tags are used incorrectly.    |
| YML007 | yaml-syntax/no-bad-scalar-start       | The scalar is formatted incorrectly.          |
| YML008 | yaml-syntax/no-block-as-implicit-key  | The identation is incorrect.                  |
| YML009 | yaml-syntax/no-block-in-flow          | Cannot use block within flow.                 |
| YML010 | yaml-syntax/no-duplicate-key          | Cannot use duplicate keys.                    |
| YML011 | yaml-syntax/impossible                | Something unexpected went wrong               |
| YML012 | yaml-syntax/no-long-key               | The key is longer than 1024 characters.       |
| YML013 | yaml-syntax/no-missing-anchor         | The anchor is missing.                        |
| YML014 | yaml-syntax/no-missing-char           | A character is missing.                       |
| YML015 | yaml-syntax/no-multiline-implicit-key | Cannot use multiple lines with implicit keys. |
| YML016 | yaml-syntax/no-multiple-anchors       | Cannot have multiple anchors.                 |
| YML017 | yaml-syntax/no-multiple-docs          | Cannot parse this document.                   |
| YML018 | yaml-syntax/no-multiple-tags          | Cannot use multiple tags.                     |
| YML019 | yaml-syntax/no-tab-as-indent          | Cannot use tabs for identation.               |
| YML020 | yaml-syntax/no-failed-tag-resolve     | Cannot resolve the tag.                       |
| YML021 | yaml-syntax/no-unexpected-toke        | The token was unexpected.                     |
