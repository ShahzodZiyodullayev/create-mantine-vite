import { createRoot } from "react-dom/client";
import { StrictMode } from "react";
import "./index.css";
import { Provider } from "react-redux";

import { store } from "@/app/store";
import { Root } from "@/app/Root";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Provider store={store}>
      <Root />
    </Provider>
  </StrictMode>,
);
