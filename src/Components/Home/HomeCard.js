// import DayTemp from "./DayTemp.js";
import "./HomeCard.css";
import React, { useState, useEffect, useRef, useContext } from "react";
import { MdOutlineFavoriteBorder, MdOutlineFavorite } from "react-icons/md";
import { LocationContext } from "../Context/CityContext";
import DayTemp from "./DayTemp.js";

export default function HomeCard() {
  const {
    location,
    city,
    current,
    forcast,
    getCurrentCondition,
    forcastFiveDays,
    locationKey,
  } = useContext(LocationContext);

  const [fevoriteBtn, setFevoriteBtn] = useState(0);
  const [addFavorite, setAddFevorite] = useState(false);
  const today = new Date();

  //   const cityKey = location[0].Key

  function addToFavorite(e) {
    if (addFavorite) {
      setAddFevorite(false);
    } else if (!addFavorite) {
      setAddFevorite(true);
    }
  }

  const iconNum = (num) => {
    const stringNum = num + "";
    const stringLen = stringNum.length;

    if (stringLen === 1) {
      return "0" + stringNum;
    } else {
      return stringNum;
    }
  };

  console.log('current', current);
  console.log('h2', city);
  return (
    <div className="Card">
      <div className="topLine">
        <div className="cityTemp">
          <img className="icon"  src={current && current[0] && `https://developer.accuweather.com/sites/default/files/${iconNum(current[0].WeatherIcon)}-s.png`} alt="Weather App Icon"></img>
          <div className="city">
            {current ? (
              <div>
                {/* <h2>{city}</h2> */}
                <h2>
                  {current && current[0] && Math.round(current[0].Temperature.Metric.Value) || "NA"} 
                  <span>&#176;</span>C
                </h2>
                <p>{current && current[0] && current[0].WeatherText || 'N/A'}</p>
                <p>{}</p>
              </div>
            ) : (
              <p>Type a city name</p>
            )}
          </div>
        </div>

        <div className="favoriteBtn" onClick={addToFavorite}>
          {addFavorite ? (
            <MdOutlineFavorite size="1.5em" />
          ) : (
            <MdOutlineFavoriteBorder size="1.5em" />
          )}
        </div>
      </div>

    
      <DayTemp iconNum = {iconNum}/>
    </div>
  );
}
