import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { PostProvider } from "./context/PostContext";
import { UserProvider } from "./context/UserContext";

ReactDOM.render(
  <UserProvider>
    <PostProvider>
      <App />
    </PostProvider>
  </UserProvider>,
  document.getElementById("root")
);
if (module.hot) {
  module.hot.accept();
}
