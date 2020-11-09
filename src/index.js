import React from "react";
import { render } from "react-dom";
import "regenerator-runtime/runtime";

import App from "./App";
import WeatherContextProvider from "./store/Context";

render(
  <WeatherContextProvider>
    <App />
  </WeatherContextProvider>,
  document.getElementById("root"),
);
