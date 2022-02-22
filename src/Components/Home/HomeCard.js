import "./HomeCard.css";
import Switch from "@mui/material/Switch";

import React, { useState, useContext, useEffect } from "react";

import { MdOutlineFavoriteBorder, MdOutlineFavorite } from "react-icons/md";
import { LocationContext } from "../Context/CityContext";
import DayTemp from "./DayTemp.js";
import Current from "./Current";

export default function HomeCard() {
  const {
    city,
    current,
    forcast,
    favoriteCities,
    setFavoriteCities,
    favorite,
    setFevorite,
    locationKey,
  } = useContext(LocationContext);

  const [unit, setUnit] = useState("C");
  const [degree, setDegree] = useState(true);

  //set data to favorite page
  const addFav = (locationKey) => {
    setFevorite(true);
    setFavoriteCities([...favoriteCities, { city: city, Key: locationKey }]);
  };

  const removeFav = (locationKey) => {
    setFevorite(false);
    setFavoriteCities(favoriteCities.filter((key) => key.Key !== locationKey));
  };

  const addToFavorite = (locationKey) => {
    const exists = favoriteCities.find((key) => key.Key === locationKey);
    if (exists) {
      return removeFav(locationKey);
    } else {
      return addFav(locationKey);
    }
  };

  const convertCelsiusToFahrenheit = (e) => {
    setDegree(!degree);
    if (degree) {
      setUnit("F");
    } else {
      setUnit("C");
    }
  };

  return (
    <div className="Card">
      <div className="topLine">
        {/* ...top card = Current... */}
        {current && <Current unit={unit} />}
        <div className="favoriteBtn" onClick={() => addToFavorite(locationKey)}>
          {favorite ? (
            <MdOutlineFavorite size="1.5em" />
          ) : (
            <MdOutlineFavoriteBorder size="1.5em" />
          )}
        </div>
      </div>

      {/* ...Five Days Forcast... */}
      <h2>Five Days Forcast</h2>
      <DayTemp {...forcast} selectedUnit={unit} setUnit={setUnit} />

      <div>
        °C
        {/* Switch is mui component */}
        <Switch
          name="C"
          inputProps={{ "aria-label": "degree" }}
          onChange={convertCelsiusToFahrenheit}
        />
        °F
      </div>
    </div>
  );
}
