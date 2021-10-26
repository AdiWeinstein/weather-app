import "./HomeCard.css";
import React, { useContext } from "react";
import { LocationContext } from "../Context/CityContext";

function DayTemp() {
  const { forcast } = useContext(LocationContext);
  const dayOfWeek = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  const iconNum = (num) => {
    const stringNum = num + "";
    const stringLen = stringNum.length;

    if (stringLen === 1) {
      return "0" + stringNum;
    } else {
      return stringNum;
    }
  };

  return (
    <div className="dayTemp">
      {forcast ? (
        forcast.map((day, i) => {
          return (
            <div className="day" key={i}>
              <h3>{dayOfWeek[new Date(day.Date).getDay()] || "N/O"}</h3>
              <img
              className="img-icon"
                src={`https://developer.accuweather.com/sites/default/files/${iconNum(day.Day.Icon)}-s.png`}
                alt={day.Day.IconPhrase}
              />
              <h4>{day.Day.IconPhrase}</h4>
              <p>
                Min: {day.Temperature.Minimum.Value || "N/O"}
                <span>&#176;</span> {day.Temperature.Minimum.Unit || "N/O"}
                <br />
                Max: {day.Temperature.Maximum.Value || "N/O"}
                <span>&#176;</span>
                {day.Temperature.Minimum.Unit || "N/O"}
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
