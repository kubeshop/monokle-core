import { createTreeNavigator, SectionBlueprint } from "rtk-tree-navigator";
import { FileEntry } from "../data/fileEntries";

export const FileTreeNavigator = createTreeNavigator({ id: "FileNavigator" });

const filesSection: SectionBlueprint<FileEntry, { fileMap: Record<string, FileEntry> }> = {
  id: "files",
  name: "Files",
  getScope: (state) => {
    return {
      fileMap: state.data.fileMap,
    };
  },
  rootSectionId: "files",
  instanceBuilder: {
    getRawItems: (scope) => {
      return Object.values(scope.fileMap);
    },
  },
  itemBlueprint: {
    getInstanceId: (rawItem) => rawItem.filePath,
    getName: (rawItem) => rawItem.filePath,
  },
};

FileTreeNavigator.setRootSectionId("files");
FileTreeNavigator.registerSection(filesSection);
