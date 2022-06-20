import React from "react";
import ReactDOM from "react-dom/client";

import "./global.css";
import App from "./App";
import { store } from "./redux/store";
import { Provider } from "react-redux";

import "antd/dist/antd.css"; // or 'antd/dist/antd.less'

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <App />,
  </React.StrictMode>
);
