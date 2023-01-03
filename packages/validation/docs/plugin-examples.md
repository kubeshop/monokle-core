# Validation Plugin Examples 

## Rule that checks for resources without any annotations

```typescript
export const noEmptyAnnotations = defineRule({
  id: 1,
  description: "Require annotations as metadata.",
  help: "Add any annotation to the Kubernetes resource.",
  validate({ resources }, { report }) {
    resources.forEach((resource) => {
      const annotations = Object.entries(resource.metadata?.annotations ?? {});
      const hasAnnotations = annotations.length > 0;

      if (!hasAnnotations) {
        report(resource, { path: "metadata.annotations" });
      }
    });
  },
});
```

## Rule that checks for Prometheus instances with the Admin API enabled

```typescript
export const noAdminApi = defineRule({
  id: 3,
  description: "Disallow the admin API for Prometheus instances.",
  help: "Do not set enabledAdminAPI to true.",
  validate({ resources }, { report }) {
    resources.filter(isPrometheus).forEach((prometheus) => {
      const valid = prometheus.spec.enableAdminAPI !== true;
      if (valid) return;
      report(prometheus, { path: "spec.enableAdminAPI" });
    });
  },
});
```

## Rule that checks for images using the latest tag

```typescript
export const noLatestImage = defineRule({
  id: 4,
  description: "Disallow images with the latest tag.",
  fullDescription:
    "The latest image makes it difficult to know which version is exactly running which might introduce subtle bugs or run a version that is vulnerable.",
  help: "Pin the exact version of the image.",
  validate({ resources }, { report }) {
    validatePodSpec(resources, (resource, pod, prefix) => {
      pod.initContainers?.forEach((container, index) => {
        const valid = !container.image?.endsWith("latest");
        if (valid) return;

        report(resource, {
          path: `${prefix}.initContainers.${index}.image`,
        });
      });

      pod.containers.forEach((container, index) => {
        const valid = !container.image?.endsWith("latest");
        if (valid) return;

        report(resource, {
          path: `${prefix}.containers.${index}.image`,
        });
      });
    });
  },
});
```

Utility method used by the above to identify PodSpecs in different resource types:

```typescript

export function validatePodSpec(
  resources: any[],
  validateFn: (resource: any, pod: PodSpec, prefix: string) => void
): void {
  resources.forEach((resource) => {
    if (
      isDeployment(resource) ||
      isStatefulSet(resource) ||
      isDaemonSet(resource) ||
      isJob(resource)
    ) {
      const pod = resource.spec?.template.spec;
      if (!pod) return;
      return validateFn(resource, pod, "spec.template.spec");
    }

    if (isCronJob(resource)) {
      const pod = resource.spec?.jobTemplate.spec?.template.spec;
      if (!pod) return;
      return validateFn(resource, pod, "spec.jobTemplate.spec.template.spec");
    }

    if (isPod(resource)) {
      const pod = resource.spec;
      if (!pod) return;
      return validateFn(resource, pod, "spec");
    }
  });
}
```

## Rule that checks if Services are exposing correct ports

```typescript
export const noPortMismatch = defineRule({
  id: 2,
  description: "The target port should match any container port.",
  help: "Change to target port to a port that matching a container's port.",
  validate({ resources }, { getRelated, report }) {
    resources.filter(isService).forEach((service) => {
      const deployments = getRelated(service).filter(isDeployment);

      const validPorts = deployments.flatMap((d) =>
        d.spec?.template.spec?.containers.flatMap((c) =>
          c.ports?.flatMap((p) => p.containerPort)
        )
      );

      const servicePorts = service.spec?.ports ?? [];
      servicePorts.forEach((port, index: number) => {
        if (!validPorts.includes(Number(port.targetPort))) {
          report(service, { path: `spec.ports.${index}.targetPort` });
        }
      });
    });
  },
});
```



