import { Icon } from "@/atoms";
import Colors from "@/styles/Colors";

export const iconMap: Record<string, JSX.Element> = {
  "kubernetes-schema": <Icon name="validation-k8s-schema" />,
  "open-policy-agent": <Icon name="validation-opa" />,
};

export const severityMap = (severity: number, isSelected: boolean) => {
  if (severity < 4) {
    return <Icon name="severity-low" style={{ color: isSelected ? Colors.grey1 : Colors.green7 }} />;
  } else if (severity < 7) {
    return <Icon name="severity-medium" style={{ color: isSelected ? Colors.grey1 : Colors.red7 }} />;
  } else {
    return <Icon name="severity-high" style={{ color: isSelected ? Colors.grey1 : Colors.red7 }} />;
  }
};
