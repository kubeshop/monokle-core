import { createTreeNavigator, SectionBlueprint } from "@monokle/tree-navigator";
import { Resource } from "../data/resources";

export const ResourceTreeNavigator = createTreeNavigator({ id: "ResourceNavigator" });

const resourcesSection: SectionBlueprint<Resource, { resourceMap: Record<string, Resource> }> = {
  id: "resources",
  name: "Resources",
  getScope: (state) => {
    return {
      resourceMap: state.data.resourceMap,
    };
  },
  rootSectionId: "files",
  instanceBuilder: {
    getRawItems: (scope) => {
      return Object.values(scope.resourceMap);
    },
  },
  itemBlueprint: {
    getInstanceId: (rawItem) => rawItem.filePath,
    getName: (rawItem) => rawItem.name,
  },
};

ResourceTreeNavigator.setRootSectionId("resources");
ResourceTreeNavigator.registerSection(resourcesSection);
