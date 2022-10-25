import { FileTreeNavigator } from "./navigators/FileTreeNavigator";
import { ResourceTreeNavigator } from "./navigators/ResourceTreeNavigator";

import "./App.css";

function App() {
  return (
    <div className="App">
      <FileTreeNavigator.Renderer height={600} />
      <ResourceTreeNavigator.Renderer height={600} />
    </div>
  );
}

export default App;
