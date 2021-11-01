import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import CityProvider from "./Components/Context/CityContext";
// import FavoritContextProvider from "./Components/Context/FavoriteContext";


ReactDOM.render(
  <React.StrictMode>
    <CityProvider>
      {/* <FavoritContextProvider> */}
   
          <App />
    
      {/* </FavoritContextProvider> */}
    </CityProvider>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
