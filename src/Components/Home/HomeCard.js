// import DayTemp from "./DayTemp.js";
import "./HomeCard.css";
import React, { useState, useEffect, useRef, useContext } from "react";
import { MdOutlineFavoriteBorder, MdOutlineFavorite } from "react-icons/md";
import { LocationContext } from "../Context/CityContext";
import DayTemp from "./DayTemp.js";
import Current from "./Current";

export default function HomeCard() {
  const { city, current } = useContext(LocationContext);

  const [addFavorite, setAddFevorite] = useState(false);

  const [unit, setUnit] = useState("F");

//   const oppositeUnit = unit === "C" ? "F" : "C";

//   const convert = () => {
//     if (unit === "C") {
//       const newT = temp * 1.8 + 32;
//       setTemp(Math.round(newT));
//       setUnit(oppositeUnit);
//     }

//     if (unit === "F") {
//       const newT = ((temp - 32) * 5) / 9;
//       setTemp(Math.round(newT));
//       setUnit(oppositeUnit);
//     }
//   };

  function addToFavorite(e) {
    if (addFavorite) {
      setAddFevorite(false);
    } else if (!addFavorite) {
      setAddFevorite(true);
    }
  }

  console.log("current", current);
  console.log("h2", city);

  return (
    <div className="Card">
      <div className="topLine">
        <Current unit={unit} />
        <div className="favoriteBtn" onClick={addToFavorite}>
          {addFavorite ? (
            <MdOutlineFavorite size="1.5em" />
          ) : (
            <MdOutlineFavoriteBorder size="1.5em" />
          )}
        </div>
      </div>

      <h2>Five Days Forcast</h2>
      <DayTemp unit={unit} />
      <button className="c-to-f-btn" >
        °C / °F
      </button>
    </div>
  );
}
