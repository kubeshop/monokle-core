import { store } from "./store";

import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";

import { Provider } from "react-redux";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <Provider store={store}>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </Provider>
);
