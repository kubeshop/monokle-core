import { createTreeNavigator } from "@monokle/tree-navigator";

export const FileTreeNavigator = createTreeNavigator({ id: "FileNavigator" });

FileTreeNavigator.registerSection("files", {
  build: {
    label: "Files",
  },
  scope: (state) => {
    return {
      fileMap: state.data.fileMap,
    };
  },
  items: {
    build: (scope) => {
      const files = Object.values(scope.fileMap);
      return files.map((file: any) => {
        return {
          id: file.filePath,
          label: file.filePath,
        };
      });
    },
  },
});

FileTreeNavigator.registerSection("files.random", {
  build: {
    label: "Random",
  },
  scope: () => {
    return { items: ["abc", "qwe", "zxc"] };
  },
  items: {
    build: (scope) => {
      return scope.items.map((item: string) => ({
        id: item,
        label: item,
      }));
    },
  },
});
