
import "./HomeCard.css";
import Switch from "@mui/material/Switch";


import React, {
  useState,
  useContext,
  useEffect
} from "react";

import { MdOutlineFavoriteBorder, MdOutlineFavorite } from "react-icons/md";
import { LocationContext } from "../Context/CityContext";
// import { FavoriteContext } from "../Context/FavoriteContext"
import DayTemp from "./DayTemp.js";
import Current from "./Current";


export default function HomeCard() {
  const {
    city,
    setCity,
    current,
    forcast,
    favoriteCity,
    setFavoriteCity,
    favorite,
    setFevorite
  } = useContext(LocationContext);

//   const {favoriteCity, setFavoriteCity} = useContext(FavoriteContext)

  
  const [unit, setUnit] = useState("C");
  const [degree, setDegree] = useState(true);


  const addToFavorite = () => {
    if (favorite) {
      setFevorite(false);
    } else if (!favorite) {
      setFevorite(true);
    
    const newFavoriteList = [...favoriteCity, {city,current}]
    setFavoriteCity(newFavoriteList)
    setCity(city)
    setFavoriteToLS(newFavoriteList)
    }
    console.log('favoriteCity', favoriteCity)
  }

  const setFavoriteToLS = (favoriteCity) => {
    localStorage.setItem('favoriteCity', JSON.stringify(favoriteCity))
  }

 
  const convertCelsiusToFahrenheit = (e) => {
    setDegree(!degree);
    if (degree) {
      setUnit("F");
    } else {
      setUnit("C");
    }
  };

  console.log("forcast", forcast);
  console.log("current", current);
  console.log("h2", city);

  return (
    <div className="Card">
      <div className="topLine">
        
        {/* ...top card = Current... */}
      
        {current && <Current unit={unit} />}
        <div className="favoriteBtn" onClick={() => addToFavorite(current)}>
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
        <Switch
          name="C"
          inputProps={{ "aria-label": "degree" }}
          // checked={degree}
          onChange={convertCelsiusToFahrenheit}
        />
        °F
      </div>
    </div>
  );
}
