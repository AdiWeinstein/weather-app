import "./HomeCard.css";
import React, { useContext } from "react";
import { LocationContext } from "../Context/CityContext";

function DayTemp({ selectedUnit}) {
  const { forcast, iconNum } = useContext(LocationContext);


  return (
    <div className="dayTemp">
      {forcast ? (
        forcast.map((day, i) => {
          return (
            <div className="day" key={i}>
              <h3>{day.dayOfWeek || "N/O"}</h3>
              <img
                className="img-icon"
                src={`https://developer.accuweather.com/sites/default/files/${iconNum(
                  day.icon
                )}-s.png`}
                alt={day.iconPhrase} 
              />
              <h4>{day.iconPhrase}</h4>
              <div>
              <span>
                {(selectedUnit === "C") ? day.celsius.min : day.fahrenheit.min }° / {(selectedUnit === "C") ? day.celsius.max : day.fahrenheit.max }°
                {selectedUnit}
              </span>
              </div>
            </div>
          );
        })
      ) : (
        <p>No data yet</p>
      )}
    </div>
  );
}

export default DayTemp;
