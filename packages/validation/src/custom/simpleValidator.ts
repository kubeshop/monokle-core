// usage

export const noPodSecurityPolicies = defineRule({
  id: "DPR053",
  name: "no-pod-security-policies",
  description: "Disallow the use of pod security policies.",
  validate(ctx: any) {
    // Input API
    const resources = ctx.resources.findMany({});

    resources.forEach((resource: any) => {
      if (resource.metadata.replicas )
      
      ctx.report(resource, {
        path: "metadata.labels",
        message: "Are you sure this is a good idea?",
      });
    });
  },
});

export default definePlugin("my-custom-plugin", [
  noPodSecurityPolicies,
  noPodSecurityPolicies,
]);

// impl

function definePlugin(name: string, init: any): any {
  return init;
}

function defineRule(init: any): any {
  return init;
}
