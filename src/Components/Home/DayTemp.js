import "./HomeCard.css";
import React, { useContext } from "react";
import { LocationContext } from "../Context/CityContext";

function DayTemp({unit}) {
  const { forcast, forcastFiveDays,iconNum } = useContext(LocationContext);
  
  
  return (
    <div className="dayTemp">
      {forcast ? (
        forcast.map((day, i) => {
          return (
            <div className="day" key={i}>
              <h3>{day.dayOfWeek || "N/O"}</h3>
              <img
              className="img-icon"
                src={`https://developer.accuweather.com/sites/default/files/${iconNum(day.icon)}-s.png`}
                alt={day.iconPhrase}
              />
              <h4>{day.iconPhrase}</h4>
              <p>
                {day.min || "N/O"}°
                / {day.max || "N/O"}°
                {unit || "N/O"}
              </p>
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
