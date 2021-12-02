import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
// import { PostProvider } from "./context/PostContext";
// import { UserProvider } from "./context/UserContext";
import { Provider } from "react-redux";
import store from "./redux/store";

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);
if (module.hot) {
  module.hot.accept();
}
