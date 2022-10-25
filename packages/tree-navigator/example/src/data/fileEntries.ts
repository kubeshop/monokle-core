import { files } from "./files";

export type FileEntry = {
  filePath: string;
};

export const fileMap: Record<string, FileEntry> = Object.fromEntries(
  files.map((filePath) => [filePath, { filePath }])
);
