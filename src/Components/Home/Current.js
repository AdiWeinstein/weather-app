import React, {  useContext, useEffect } from "react";
import { LocationContext } from "../Context/CityContext";

function Current({unit}) {
  const { city, current, iconNum , setCurrent, getCurrentCondition, locationKey, location} =
    useContext(LocationContext);

    // useEffect(() => {
    //   getCurrentCondition(locationKey)
    //   .then(data => {
    //     console.log("getCurrentCondition" , data)
    //     setCurrent(data)
    //   })
    // }, [locationKey])

  return (
    <div className="cityTemp">
      {
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
                <h2 className="cityName">{city ? city : "Tel-Aviv"}</h2>
                <h2 className="currentTemp">
                  {unit==="C" ? i.celsius : i.fahrenheit}°{unit}
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
