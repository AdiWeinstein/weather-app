import React, { useState, useEffect, useRef, useContext } from "react";
import { LocationContext } from "../Context/CityContext";

function Current({ unit }) {
  const { city, current, getCurrentCondition,iconNum } = useContext(LocationContext);
  const [temp, setTemp] = useState();

  return (
    <div className="cityTemp">
      {current &&
        current.map((i, index) => (
          <div className="cityTemp" key={index}>
            <img
              className="icon"
              src={
                current &&
                `https://developer.accuweather.com/sites/default/files/${iconNum(
                  i.icon
                )}-s.png`
              }
              alt="Weather App Icon"
            ></img>

            <div className="city">
              <div className="cityInfo">
                <h2 className="cityName">{city}</h2>
                <h2 className="currentTemp">
                  {i.temp || "N/A"}°{unit}
                </h2>
                <p>{i.WeatherText || "N/A"}</p>
              </div>
            </div>
          </div>
        ))}
    
    </div>
  );
}

export default Current;
