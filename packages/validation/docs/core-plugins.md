## Core Validation plugins

There are several cores plugins:

- [Kubernetes Schema](#kubernetes-schema) - includes deprecation/violation 
- [Pod Security Standards](#pod-security-standards) - as defined by K8s
- [Common Practices](#common-practices) 
- [Resource links](#resource-links)
- [Metadata](#metadata)
- [Open Policy Agent](#open-policy-agent)
- [YAML Syntax](#yaml-syntax)

All plugins are enabled by default and all rules are enabled as a warning.


### Kubernetes Schema

Validates whether the Kubernetes resources comply with the JSON schema of the specified Kubernetes version. Also
validates if resource versions/kinds are deprecated or removed in the target version.

Specify the desired Kubernetes version under the settings - default version is 1.25.10

```yaml
plugins:
  kubernetes-schema: true
settings:
  kubernetes-schema:
    schemaVersion: "v1.26.1"
```

| name          | description                          | default    |
|---------------|--------------------------------------|------------|
| schemaVersion | The version of the Kubernetes schema | "v1.25.10" |

**Rules**

| id     | name                                   | description                                                       |
|--------|----------------------------------------|-------------------------------------------------------------------|
| K8S001 | kubernetes-schema/schema-violated      | The resource is formatted incorrectly.                            |
| K8S002 | kubernetes-schema/deprecation-violated | The resource uses deprecated "apiVersion" value.                  |
| K8S003 | kubernetes-schema/removal-violated     | The resource uses removed "apiVersion" value.                     |
| K8S004 | kubernetes-schema/strict-mode-violated | The resource has unsupported or invalid "apiVersion" field value. |


### Pod Security Standards

Read about Kubernetes Pod Security Standards in the [Kubernetes Documentation](https://kubernetes.io/docs/concepts/security/pod-security-standards/)

There are no settings for this plugin.

```yaml
plugins:
  pod-security-standards: true
```

**Rules**

| id     | name                                           | description                                         |
|--------|------------------------------------------------|-----------------------------------------------------|
| PSS101 | pod-security-standard/host-process             | Disallow access to Windows host processes.          |
| PSS102 | pod-security-standard/host-namespaces          | Sharing the host namespaces must be disallowed.     |
| PSS103 | pod-security-standard/privileged-containers    | Restrict usage of privileged pods.                  |
| PSS104 | pod-security-standard/capabilities             | Limit pod capabilities.                             |
| PSS105 | pod-security-standard/host-path-volumes        | Restrict host path volumes.                         |
| PSS106 | pod-security-standard/host-ports               | Restrict host ports.                                |
| PSS107 | pod-security-standard/app-armor                | Prohibit customised app armor.                      |
| PSS108 | pod-security-standard/selinux                  | Restrict usage of SELinux.                          |
| PSS109 | pod-security-standard/proc-mount               | Prohibit custom proc masks.                         |
| PSS110 | pod-security-standard/seccomp                  | Prohibit unconfined seccomps.                       |
| PSS111 | pod-security-standard/sysctls                  | Restrict sysctls to a safe subset.                  |
| PSS201 | pod-security-standard/volume-types             | Restrict use of volume types.                       |
| PSS202 | pod-security-standard/privilege-escalation     | Disallow the process from elevating its privileges. |
| PSS203 | pod-security-standard/running-as-non-root      | Requires the container to runs as non root user.    |
| PSS204 | pod-security-standard/running-as-non-root-user | Restrict running with a root user ID.               |
| PSS205 | pod-security-standard/seccomp-strict           | Enforce a valid seccomp profile to be set.          |
| PSS206 | pod-security-standard/capabilities-strict      | Limit pod capabilities strictly.                    |

### Common Practices

These rules are related to common practices in the K8s community, use them to further improve your Kubernetes deployments.

There are no settings for this plugin.

```yaml
plugins:
 practices: true
```

**Rules**

| id     | name                                         | description                                                |
|--------|----------------------------------------------|------------------------------------------------------------|
| KBP001 | practices/no-latest-image                    | Disallow images with the latest tag                        |
| KBP002 | practices/cpu-request                        | Require the CPU to be requested                            |
| KBP003 | practices/cpu-limit                          | Require the CPU to be limited                              |
| KBP004 | practices/memory-request                     | Require the memory to be requested                         |
| KBP005 | practices/memory-limit                       | Require the memory to be limited                           |
| KBP100 | practices/no-sys-admin                       | Disallow the SYS_ADMIN capability                          |
| KBP101 | practices/no-mounted-docker-sock             | Disallow mounting the Docker socket using hostPath volumes |
| KBP102 | practices/no-writable-fs                     | Require a read-only root file system                       |
| KBP103 | practices/drop-capabilities                  | Require default capabilities to be dropped                 |
| KBP104 | practices/no-low-user-id                     | Disallow running with a low user ID                        |
| KBP105 | practices/no-low-group-id                    | Disallow running with a low group ID                       |
| KBP106 | practices/no-automount-service-account-token | Disallow automounting the service account token            |
| KBP107 | practices/no-pod-create                      | Disallow permissions to create pods                        |
| KBP108 | practices/no-pod-execute                     | Disallow permissions to exec on pods                       |
| KBP109 | practices/no-root-group                      | Disallow setting runAsGroup to zero                        |


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

| id     | name                                       | description                           |
|--------|--------------------------------------------|---------------------------------------|
| LNK001 | resource-links/no-missing-links            | Disallow unsatisfied links.           |
| LNK002 | resource-links/no-missing-optional-links   | Disallow unsatisfied optional links.  |
| LNK003 | resource-links/no-missing-owner-references | Disallow unsatisfied ownerReferences. |

### Metadata

This is a flexible validator that allows you to check for correct metadata fields and values.

For the custom label and annotation related rules the work as follows:

```
rules:
  metadata/custom-labels: [<level>, <array of keys>]   
  metadata/custom-annotations: [<level>, <array of keys>]   
  metadata/foo-label: [<level>, <array of values>]   
  metadata/foo-annotation: [<level>, <array of values>]   
```

for example:

```
rules:
  metadata/custom-labels: ["warn", ["label-one", "label-two"]]   
  metadata/custom-annotations: ["error",["annotation-one", "another-annotation"]]   
  metadata/foo-label: [true, ["bar", "zoo"]]   
  metadata/foo-annotation: ["warn", ["ben", "joe"]]   
```

There are no settings for this plugin.

```yaml
plugins:
  metadata: true
```

**Rules**

| id                     | name                        | description                                                                                                                                                                                                                                                |
|------------------------|-----------------------------|------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| MTD-recommended-labels | metadata/recommended-labels | Recommended labels are missing - by default this checks for the following lables: `app.kubernetes.io/name`, `app.kubernetes.io/instance`,`app.kubernetes.io/version`,`app.kubernetes.io/component`,`app.kubernetes.io/part-of`,`app.kubernetes.io/managed` |
| MTD-custom-labels      | metadata/custom-labels      | Custom labels are missing.                                                                                                                                                                                                                                 |
| MTD-custom-annotations | metadata/custom-annotations | Custom annotations are missing.                                                                                                                                                                                                                            |
| MTD-<name>-label       | metadata/<name>-label       | Validate the specified label as configured.                                                                                                                                                                                                                |
| MTD-<name>-annotation  | metadata/<name>-annotation  | Validate the specified annotation as configured.                                                                                                                                                                                                           |


### Open Policy Agent

A collection of security rules.

Under the hood it compiles Rego policies into a WebAssembly module that handles the validation. A big shout out to the DefSec team at [Aqua Security](https://www.aquasec.com/) as full credit for these rules goes to them. You can find the source of their Rego policies [here](https://github.com/aquasecurity/defsec).

There are no settings for this plugin.

```yaml
plugins:
  open-policy-agent: true
```

**Rules**

| id     | name                                        | description                                            |
|--------|---------------------------------------------|--------------------------------------------------------|
| KSV001 | open-policy-agent/no-elevated-process       | Disallow the process from elevating its privileges.    |
| KSV002 | open-policy-agent/app-armor                 | Require a default AppArmor profile                     |
| KSV003 | open-policy-agent/drop-capabilities         | Require default capabilities to be dropped             |
| KSV005 | open-policy-agent/no-sys-admin              | Disallow the SYS_ADMIN capability                      |
| KSV006 | open-policy-agent/no-mounted-docker-sock    | Disallow mounting the hostPath volume with docker.sock |
| KSV008 | open-policy-agent/no-host-ipc               | Disallow access to host IPC namespace                  |
| KSV009 | open-policy-agent/no-host-network           | Disallow access to host network                        |
| KSV010 | open-policy-agent/no-host-pid               | Disallow access to host PID                            |
| KSV011 | open-policy-agent/cpu-limit                 | Require the CPU to be limited                          |
| KSV012 | open-policy-agent/run-as-non-root           | Requires the container to runs as non root user        |
| KSV013 | open-policy-agent/no-latest-image           | Disallow images with the latest tag                    |
| KSV014 | open-policy-agent/no-writable-fs            | Require a read-only root file system                   |
| KSV015 | open-policy-agent/cpu-request               | Require the CPU to be requested                        |
| KSV016 | open-policy-agent/memory-request            | Require the memory to be requested                     |
| KSV017 | open-policy-agent/no-privileged             | Disallow the use of privileged containers              |
| KSV018 | open-policy-agent/memory-limit              | Require the memory to be limited                       |
| KSV020 | open-policy-agent/no-low-user-id            | Disallow running with a low user ID                    |
| KSV021 | open-policy-agent/no-low-group-id           | Disallow running with a low group ID                   |
| KSV023 | open-policy-agent/no-host-mounted-path      | Disallow mounting hostPath volumes                     |
| KSV024 | open-policy-agent/no-host-port-access       | Disallow accessing the host ports                      |
| KSV025 | open-policy-agent/no-selinux                | Disallow custom SELinux options                        |
| KSV027 | open-policy-agent/no-proc-mount             | Disallow setting proc masks                            |
| KSV028 | open-policy-agent/no-non-emphemeral-volumes | Disallow use of non-ephemeral volume types             |
| KSV029 | open-policy-agent/no-root-group             | Disallow setting runAsGroup to zero.                   |
| KSV030 | open-policy-agent/seccomp-profile           | Require a Seccomp profile                              |


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
|--------|---------------------------------------|-----------------------------------------------|
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
