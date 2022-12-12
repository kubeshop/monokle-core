import { defineRule } from "@monokle/plugin-toolkit";
import { isDeployment } from "../schemas/__generated__/deployment.apps.v1.js";
import { isService } from "../schemas/__generated__/service.v1.js";

/**
 * An advanced example which uses related resources
 *
 * @remark use `npm run codegen` to generate types.
 */
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
