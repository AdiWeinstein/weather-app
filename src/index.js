import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import CityProvider from "./Components/Context/CityContext";

ReactDOM.render(
  <React.StrictMode>
    <CityProvider>
      <App />
    </CityProvider>
  </React.StrictMode>,
  document.getElementById("root")
);


reportWebVitals();
