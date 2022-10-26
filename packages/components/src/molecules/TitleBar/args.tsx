import { Button } from "antd";
import { TitleBarType } from "./types";

export const TextTitleBarArgs: TitleBarType = {
  actions: (
    <Button type="primary" size="small">
      Some action
    </Button>
  ),
  title: "Resources",
  type: "secondary",
};
