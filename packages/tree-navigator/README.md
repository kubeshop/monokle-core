# @monokle/tree-navigator

Create tree structures based on your Redux state then easily render it in React.

# Features:

- Define sections (tree levels) and section items (tree nodes) using simple blueprint objects
- Virtualized rendering of trees
- Expand & collapse sections
- Customize both sections and items with your own components
# Usage

---
```tsx

// RTK Listeners setup
export const listenerMiddleware = createListenerMiddleware();
export type AppStartListening = TypedStartListening<RootState, AppDispatch>;
export type AppStopListening = TypedStopListening<RootState, AppDispatch>;
export const startAppListening = listenerMiddleware.startListening as AppStartListening;
export const stopAppListening = listenerMiddleware.stopListening as AppStopListening;

// configure the redux store
const store = configureStore({
  reducer: combineReducers({
    // add the reducer created by rtk-tree-navigator
    ...getTreeNavigatorReducer(),
    // other reducers...
  }),
  middleware: getDefaultMiddleware => getDefaultMiddleware().prepend(
    listenerMiddleware.middleware
  ),
});

// rtk-tree-navigator setup
setupTreeNavigators({
  startListening: startAppListening,
  stopListening: stopAppListening,
  dispatch: store.dispatch
})

// create your first tree navigator
export const treeNavigator = createTreeNavigator("Resources");

// create section blueprints
const workloadsBlueprint: SectionBlueprint = { id: 'workloads' /* ... */ };
const deploymentsBlueprint: SectionBlueprint = { id: 'deployments' /* ... */};

// alternative of creating sections (not implemented yet)
defineSection({
	id: “test”,
	buildScope: (state) => { … },
	buildItems: (mapItems, scope) => {
		return mapItems(Object.values(scope.itemMap), (rawItem) => {
			id: rawItem.id,
			name: rawItem.name,
			properties: {}
			events: {}
			customization: {}
			…
		};
	} 
})

treeNavigator.registerSection(sectionBlueprint);
treeNavigator.registerChildSection("workloads", deploymentsBlueprint);
treeNavigator.setRootSectionId('workloads');
treeNavigator.unregisterSection('workloads');

// the tree navigator can be rendered by using the Renderer component
<treeNavigator.Renderer />

```

Possible refactors:
- `SectionBlueprint` could be renamed to `TreeLevel` and refactored into a class
- `ItemBlueprint` could be renamed to `TreeNode`
- `SectionInstance` could be `TreeLevelInstance` and `ItemInstance` could be `TreeNodeInstance`


