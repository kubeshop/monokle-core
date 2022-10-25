import { files } from "./files";

export type Resource = {
  filePath: string;
  name: string;
};

export const resourceMap: Record<string, Resource> = Object.fromEntries(
  files.map((filePath) => [filePath, { name: filePath.substring(0, filePath.length - 4), filePath }])
);
