import { PolicyMetadata } from "./types.js";

export const DEFAULT_TRIVY_PLUGIN: PolicyMetadata = {
  name: "Default Trivy policies",
  id: "io.kubeshop.monokle.templates.default.policy",
  author: "kubeshop.io",
  version: "0.1.0",
  description: "Default policies for Kubernetes resources.",
  type: "basic",
  module: "./policy.wasm",
  rules: [
    {
      id: "KSV001",
      name: "PROCESS_ELEVATED",
      shortDescription: {
        text: "Process can elevate its own privileges",
      },
      longDescription: {
        text: "A program inside the container can elevate its own privileges and run as root, which might give the program control over the container and node.",
      },
      helpUri:
        "https://kubernetes.io/docs/concepts/security/pod-security-standards/#restricted",
      help: {
        text: "Set 'set containers[].securityContext.allowPrivilegeEscalation' to 'false'.",
      },
      properties: {
        severity: "medium",
        entrypoint: "appshield/kubernetes/KSV001/deny",
        path: "$container.securityContext.allowPrivilegeEscalation",
      },
    },
    {
      id: "KSV002",
      name: "APP_ARMOR_UNSET",
      shortDescription: {
        text: "Default AppArmor profile not set",
      },
      longDescription: {
        text: "A program inside the container can bypass AppArmor protection policies.",
      },
      helpUri:
        "https://kubesec.io/basics/containers-securitycontext-capabilities-drop-index-all/",
      help: {
        text: "Remove 'container.apparmor.security.beta.kubernetes.io' annotation or set it to 'runtime/default'.",
      },
      properties: {
        problem: {
          severity: "warning",
        },
        severity: "medium",
        entrypoint: "appshield/kubernetes/KSV002/deny",
        path: "$container.AppArmor",
      },
    },
    {
      id: "KSV003",
      name: "ALL_DEFAULT_ENABLED",
      shortDescription: {
        text: "Default capabilities not dropped",
      },
      longDescription: {
        text: "The container should drop all default capabilities and add only those that are needed for its execution.",
      },
      helpUri:
        "https://kubesec.io/basics/containers-securitycontext-capabilities-drop-index-all/",
      help: {
        text: "Add 'ALL' to containers[].securityContext.capabilities.drop.",
      },
      properties: {
        severity: "low",
        entrypoint: "appshield/kubernetes/KSV003/deny",
        path: "$container.securityContext.capabilities.drop",
      },
    },
    {
      id: "KSV005",
      name: "SYS_ADMIN_ENABLED",
      shortDescription: {
        text: "SYS_ADMIN capability added",
      },
      longDescription: {
        text: "SYS_ADMIN gives the processes running inside the container privileges that are equivalent to root.",
      },
      helpUri:
        "https://kubesec.io/basics/containers-securitycontext-capabilities-add-index-sys-admin/",
      help: {
        text: "Remove the SYS_ADMIN capability from 'containers[].securityContext.capabilities.add'.",
      },
      properties: {
        severity: "high",
        entrypoint: "appshield/kubernetes/KSV005/deny",
        path: "$container.securityContext.capabilities.add",
      },
    },
    {
      id: "KSV006",
      name: "DOCKER_SOCK_MOUNTED",
      shortDescription: {
        text: "hostPath volume mounted with docker.sock",
      },
      longDescription: {
        text: "Mounting docker.sock from the host can give the container full root access to the host.",
      },
      helpUri:
        "https://kubesec.io/basics/spec-volumes-hostpath-path-var-run-docker-sock/",
      help: {
        text: "Do not specify `/var/run/docker.sock` in spec.template.volumes.hostPath.path.",
      },
      properties: {
        severity: "high",
        entrypoint: "appshield/kubernetes/KSV006/deny",
        path: "spec.template.spec.volumes.hostPath.path",
      },
    },
    {
      id: "KSV008",
      name: "HOST_IPC_ENABLED",
      shortDescription: {
        text: "Access to host IPC namespace",
      },
      longDescription: {
        text: "Sharing the host's IPC namespace allows container processes to communicate with processes on the host.",
      },
      helpUri:
        "https://kubernetes.io/docs/concepts/security/pod-security-standards/#baseline",
      help: {
        text: "Do not set 'spec.template.spec.hostIPC' to true.",
      },
      properties: {
        severity: "high",
        entrypoint: "appshield/kubernetes/KSV008/deny",
        path: "spec.template.spec.hostIPC",
      },
    },
    {
      id: "KSV009",
      name: "HOST_NETWORK_ENABLED",
      shortDescription: {
        text: "Access to host network",
      },
      longDescription: {
        text: "Sharing the host’s network namespace permits processes in the pod to communicate with processes bound to the host’s loopback adapter.",
      },
      helpUri:
        "https://kubernetes.io/docs/concepts/security/pod-security-standards/#baseline",
      help: {
        text: "Do not set 'spec.template.spec.hostNetwork' to true.",
      },
      properties: {
        severity: "high",
        entrypoint: "appshield/kubernetes/KSV009/deny",
        path: "spec.template.spec.hostNetwork",
      },
    },
    {
      id: "KSV010",
      name: "HOST_PID_ENABLED",
      shortDescription: {
        text: "Access to host PID",
      },
      longDescription: {
        text: "Sharing the host’s PID namespace allows visibility on host processes, potentially leaking information such as environment variables and configuration.",
      },
      helpUri:
        "https://kubernetes.io/docs/concepts/security/pod-security-standards/#baseline",
      help: {
        text: "Do not set 'spec.template.spec.hostPID' to true.",
      },
      properties: {
        severity: "high",
        entrypoint: "appshield/kubernetes/KSV010/deny",
        path: "spec.template.spec.hostPID",
      },
    },
    {
      id: "KSV011",
      name: "CPU_LIMIT_MISSING",
      shortDescription: {
        text: "CPU not limited",
      },
      longDescription: {
        text: "Enforcing CPU limits prevents DoS via resource exhaustion.",
      },
      helpUri:
        "https://cloud.google.com/blog/products/containers-kubernetes/kubernetes-best-practices-resource-requests-and-limits",
      help: {
        text: "Add a cpu limitation to 'spec.resources.limits.cpu'.",
      },
      properties: {
        severity: "low",
        entrypoint: "appshield/kubernetes/KSV011/deny",
        path: "$container.resources.limits.cpu",
      },
    },
    {
      id: "KSV012",
      name: "RUN_AS_NON_ROOT_DISABLED",
      shortDescription: {
        text: "Runs as root user",
      },
      longDescription: {
        text: '"runAsNonRoot" forces the running image to run as a non-root user to ensure least privileges.',
      },
      helpUri:
        "https://kubernetes.io/docs/concepts/security/pod-security-standards/#restricted",
      help: {
        text: "Set 'containers[].securityContext.runAsNonRoot' to true.",
      },
      properties: {
        severity: "medium",
        entrypoint: "appshield/kubernetes/KSV012/deny",
        path: "$container.securityContext.runAsNonRoot",
      },
    },
    {
      id: "KSV013",
      name: "IMAGE_LATEST",
      shortDescription: {
        text: 'Image tag ":latest" used',
      },
      longDescription: {
        text: "It is best to avoid using the ':latest' image tag when deploying containers in production. Doing so makes it hard to track which version of the image is running, and hard to roll back the version.",
      },
      helpUri:
        "https://kubernetes.io/docs/concepts/configuration/overview/#container-images",
      help: {
        text: "Use a specific container image tag that is not 'latest'.",
      },
      properties: {
        severity: "low",
        entrypoint: "appshield/kubernetes/KSV013/deny",
        path: "$container.image",
      },
    },
    {
      id: "KSV014",
      name: "READONLY_DISABLED",
      shortDescription: {
        text: "Root file system is not read-only",
      },
      longDescription: {
        text: "An immutable root file system prevents applications from writing to their local disk. This can limit intrusions, as attackers will not be able to tamper with the file system or write foreign executables to disk.",
      },
      helpUri:
        "https://kubesec.io/basics/containers-securitycontext-readonlyrootfilesystem-true/",
      help: {
        text: "Change 'containers[].securityContext.readOnlyRootFilesystem' to 'true'.",
      },
      properties: {
        severity: "low",
        entrypoint: "appshield/kubernetes/KSV014/deny",
        path: "$container.securityContext.readOnlyRootFilesystem",
      },
    },
    {
      id: "KSV015",
      name: "CPU_REQUEST_MISSING",
      shortDescription: {
        text: "CPU requests not specified",
      },
      longDescription: {
        text: "When containers have resource requests specified, the scheduler can make better decisions about which nodes to place pods on, and how to deal with resource contention.",
      },
      helpUri:
        "https://kubesec.io/basics/containers-securitycontext-capabilities-drop-index-all/",
      help: {
        text: "Set 'containers[].resources.requests.cpu'.",
      },
      properties: {
        severity: "low",
        entrypoint: "appshield/kubernetes/KSV015/deny",
        path: "$container.resources.requests.cpu",
      },
    },
    {
      id: "KSV016",
      name: "MEM_REQUEST_MISSING",
      shortDescription: {
        text: "Memory requests not specified",
      },
      longDescription: {
        text: "When containers have memory requests specified, the scheduler can make better decisions about which nodes to place pods on, and how to deal with resource contention.",
      },
      helpUri: "https://kubesec.io/basics/containers-resources-limits-memory/",
      help: {
        text: "Set 'containers[].resources.requests.memory'.",
      },
      properties: {
        severity: "low",
        entrypoint: "appshield/kubernetes/KSV016/deny",
        path: "$container.resources.requests.memory",
      },
    },
    {
      id: "KSV017",
      name: "PRIVILEGED_ENABLED",
      shortDescription: {
        text: "Privileged container",
      },
      longDescription: {
        text: "Privileged containers share namespaces with the host system and do not offer any security. They should be used exclusively for system containers that require high privileges.",
      },
      helpUri:
        "https://kubernetes.io/docs/concepts/security/pod-security-standards/#baseline",
      help: {
        text: "Change 'containers[].securityContext.privileged' to false",
      },
      properties: {
        severity: "high",
        entrypoint: "appshield/kubernetes/KSV017/deny",
        path: "$container.securityContext.privileged",
      },
    },
    {
      id: "KSV018",
      name: "MEM_LIMIT_MISSING",
      shortDescription: {
        text: "Memory not limited",
      },
      longDescription: {
        text: "Enforcing memory limits prevents DoS via resource exhaustion.",
      },
      helpUri: "https://kubesec.io/basics/containers-resources-limits-memory/",
      help: {
        text: "Set a limit value under 'containers[].resources.limits.memory'.",
      },
      properties: {
        severity: "low",
        entrypoint: "appshield/kubernetes/KSV018/deny",
        path: "$container.resources.limits.memory",
      },
    },
    {
      id: "KSV020",
      name: "LOW_USER_ID",
      shortDescription: {
        text: "Runs with low user ID",
      },
      longDescription: {
        text: "Force the container to run with user ID > 10000 to avoid conflicts with the host’s user table.",
      },
      helpUri:
        "https://kubesec.io/basics/containers-securitycontext-runasuser/",
      help: {
        text: "Set 'containers[].securityContext.runAsUser' to an integer > 10000.",
      },
      properties: {
        severity: "low",
        entrypoint: "appshield/kubernetes/KSV020/deny",
        path: "$container.securityContext.runAsUser",
      },
    },
    {
      id: "KSV021",
      name: "LOW_GROUP_ID",
      shortDescription: {
        text: "Runs with low group ID",
      },
      longDescription: {
        text: "Force the container to run with group ID > 10000 to avoid conflicts with the host’s user table.",
      },
      helpUri:
        "https://kubesec.io/basics/containers-securitycontext-runasuser/",
      help: {
        text: "Set 'containers[].securityContext.runAsGroup' to an integer > 10000.",
      },
      properties: {
        severity: "medium",
        entrypoint: "appshield/kubernetes/KSV021/deny",
        path: "$container.securityContext.runAsGroup",
      },
    },
    {
      id: "KSV023",
      name: "HOST_PATH_MOUNTED",
      shortDescription: {
        text: "hostPath volumes mounted",
      },
      longDescription: {
        text: "HostPath volumes must be forbidden.",
      },
      helpUri:
        "https://kubernetes.io/docs/concepts/security/pod-security-standards/#baseline",
      help: {
        text: "Do not set 'spec.volumes[*].hostPath'.",
      },
      properties: {
        severity: "medium",
        entrypoint: "appshield/kubernetes/KSV023/deny",
        path: "spec.template.spec.volumes.hostPath",
      },
    },
    {
      id: "KSV024",
      name: "HOST_PORT_ACCESS",
      shortDescription: {
        text: "Access to host ports",
      },
      longDescription: {
        text: "HostPorts should be disallowed, or at minimum restricted to a known list.",
      },
      helpUri:
        "https://kubernetes.io/docs/concepts/security/pod-security-standards/#baseline",
      help: {
        text: "Do not set spec.containers[*].ports[*].hostPort and spec.initContainers[*].ports[*].hostPort.",
      },
      properties: {
        severity: "high",
        entrypoint: "appshield/kubernetes/KSV024/deny",
        path: "$container.ports",
      },
    },
    {
      id: "KSV025",
      name: "SELINUX_MISCONFIG",
      shortDescription: {
        text: "SELinux custom options set",
      },
      longDescription: {
        text: "Force the container to run with group ID > 10000 to avoid conflicts with the host's user table.",
      },
      helpUri:
        "https://kubernetes.io/docs/concepts/security/pod-security-standards/#baseline",
      help: {
        text: "Do not set spec.securityContext.seLinuxOptions, spec.containers[*].securityContext.seLinuxOptions and spec.initContainers[*].securityContext.seLinuxOptions.",
      },
      properties: {
        severity: "medium",
        entrypoint: "appshield/kubernetes/KSV025/deny",
        path: "$container.securityContext.seLinuxOptions",
      },
    },
    {
      id: "KSV027",
      name: "PROC_MOUNT_SET",
      shortDescription: {
        text: "Non-default /proc masks set",
      },
      longDescription: {
        text: "The default /proc masks are set up to reduce attack surface, and should be required.",
      },
      helpUri:
        "https://kubernetes.io/docs/concepts/security/pod-security-standards/#baseline",
      help: {
        text: "Do not set spec.containers[*].securityContext.procMount and spec.initContainers[*].securityContext.procMount.",
      },
      properties: {
        severity: "medium",
        entrypoint: "appshield/kubernetes/KSV027/deny",
        path: "$container.securityContext.procMount",
      },
    },
    {
      id: "KSV028",
      name: "VOLUME_NON_EPHEMERAL",
      shortDescription: {
        text: "Non-ephemeral volume types used",
      },
      longDescription: {
        text: "In addition to restricting HostPath volumes, usage of non-ephemeral volume types should be limited to those defined through PersistentVolumes.",
      },
      helpUri:
        "https://kubernetes.io/docs/concepts/security/pod-security-standards/#restricted",
      help: {
        text: "Do not Set 'spec.volumes[*]' to any of the disallowed volume types.",
      },
      properties: {
        severity: "low",
        entrypoint: "appshield/kubernetes/KSV028/deny",
        path: "spec.template.spec.volumes",
      },
    },
    {
      id: "KSV029",
      name: "DEFAULT_GROUP_ID",
      shortDescription: {
        text: "A root primary or supplementary GID set.",
      },
      longDescription: {
        text: "Containers should be forbidden from running with a root primary or supplementary GID.",
      },
      helpUri:
        "https://kubernetes.io/docs/concepts/security/pod-security-standards/#restricted",
      help: {
        text: "containers[].securityContext.runAsGroup' to a non-zero integer or leave undefined.",
      },
      properties: {
        severity: "low",
        entrypoint: "appshield/kubernetes/KSV029/deny",
        path: "$container.securityContext.runAsGroup",
      },
    },
    {
      id: "KSV030",
      name: "SECCOMP_PROFILE_MISSING",
      shortDescription: {
        text: "Default Seccomp profile not set",
      },
      longDescription: {
        text: "The RuntimeDefault seccomp profile must be required, or allow specific additional profiles.",
      },
      helpUri:
        "https://kubernetes.io/docs/concepts/security/pod-security-standards/#restricted",
      help: {
        text: "Set 'spec.securityContext.seccompProfile.type', 'spec.containers[*].securityContext.seccompProfile' and 'spec.initContainers[*].securityContext.seccompProfile' to 'RuntimeDefault' or undefined.",
      },
      properties: {
        severity: "low",
        entrypoint: "appshield/kubernetes/KSV030/deny",
        path: "$container.securityContext.seccompProfile.type",
      },
    },
  ],
};

export const OPEN_POLICY_AGENT_RULES = DEFAULT_TRIVY_PLUGIN.rules;
