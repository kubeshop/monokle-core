import Colors from "@/styles/Colors";
import { ComponentMeta, ComponentStoryObj } from "@storybook/react";
import { ActivityBar } from "./ActivityBar";
import Icon from "../../atoms/Icon";

const meta: ComponentMeta<typeof ActivityBar> = {
  title: "Molecules/ActivityBar",
  component: ActivityBar,
};
export default meta;

export const Primary: ComponentStoryObj<typeof ActivityBar> = {
  args: {
    activities: [
      {
        type: "panel",
        name: "explorer",
        tooltip: "File Explorer",
        icon: (selected) => <Icon name={selected ? "terminal" : "search"} color={Colors.grey9} />,
        component: <div>File Pane</div>,
      },
      {
        type: "panel",
        name: "kustomize",
        tooltip: "Kustomize",
        icon: () => <Icon name="kustomize" color={Colors.grey9} />,
        component: <div>Kustomize Pane</div>,
      },
      {
        type: "panel",
        name: "helm",
        tooltip: "Helm",
        icon: () => <Icon name="helm" color={Colors.grey9} />,
        component: <div>Helm Pane</div>,
      },
    ],
    onChange: () => {},
  },
};
