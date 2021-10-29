// import DayTemp from "./DayTemp.js";
import "./HomeCard.css";
import Switch from '@mui/material/Switch';
import { Button } from '@mui/material';

import React, {
  useState,
  useEffect,
  useRef,
  useContext,
  toCelsius,
} from "react";
import { MdOutlineFavoriteBorder, MdOutlineFavorite } from "react-icons/md";
import { LocationContext } from "../Context/CityContext";
import DayTemp from "./DayTemp.js";
import Current from "./Current";

export default function HomeCard() {
  const { city, current, forcast, setForcast, setCurrent, forcastFiveDays, getCurrentCondition } =
    useContext(LocationContext);

  const [addFavorite, setAddFevorite] = useState(false);
  const [unit, setUnit] = useState('C')
  const [degree, setDegree] = useState(true)

  function addToFavorite(e) {
    if (addFavorite) {
      setAddFevorite(false);
    } else if (!addFavorite) {
      setAddFevorite(true);
    }
  }

  const convertCelsiusToFahrenheit = (e) => {
    setDegree(!degree)
    if (degree) {
      setUnit("F");
    } else {
      setUnit("C");
    }
  };

  // const handleChange = (event) => {
  //     setDegree({
  //       ...unit,
  //       [event.target.name]: event.target.checked,
  //     });
  //     setUnit(unit ? "C" : "F")
  //   };

  console.log("forcast", forcast);
  console.log("current", current);
  console.log("h2", city);

  return (
    <div className="Card">
      <div className="topLine">

        {/* ...top card = Current... */}
        <Current unit={unit} />
        <div className="favoriteBtn" onClick={addToFavorite}>
          {addFavorite ? (
            <MdOutlineFavorite size="1.5em" />
          ) : (
            <MdOutlineFavoriteBorder size="1.5em" />
          )}
        </div>
      </div>

      {/* ...Five Days Forcast... */}

      <h2>Five Days Forcast</h2>
      <DayTemp  {...forcast} selectedUnit={unit} setUnit={setUnit} />

      <Switch
        //   onClick={convertCelsiusToFahrenheit} 
        name='C'
        inputProps={{ 'aria-label': 'degree' }}
        // checked={degree}
        onChange={convertCelsiusToFahrenheit}
      />

    </div>
  );
}
