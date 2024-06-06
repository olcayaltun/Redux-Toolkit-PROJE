import React from "react";
import ReactDOM from "react-dom"; // ReactDOM import is correct
import "./index.css";
import App from "./App";
import { Provider } from "react-redux";
import store from "./redux/store";
ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root") // root element added to render function
);
