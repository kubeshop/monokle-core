import { createTreeNavigator } from "@monokle/tree-navigator";

export const ResourceTreeNavigator = createTreeNavigator({ id: "ResourceNavigator" });

ResourceTreeNavigator.registerSection("files", {
  build: {
    label: "Resources",
  },
  scope: (state) => {
    return {
      resourceMap: state.data.resourceMap,
    };
  },
  items: {
    build: (scope) => {
      const resources = Object.values(scope.resourceMap);
      return resources.map((resource: any) => {
        return {
          id: resource.filePath,
          label: resource.name,
        };
      });
    },
  },
});
