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
    favoriteCities,
    setFavoriteCities,
    favorite,
    setFevorite,
    locationKey,
    getCurrentConditionByKey
  } = useContext(LocationContext);



  
  const [unit, setUnit] = useState("C");
  const [degree, setDegree] = useState(true);

  // const addToFav = locationKey => setFavoriteCities([...favoriteCities , locationKey])
  // const removeFav = locationKey => setFavoriteCities(favoriteCities.filter(key => key.locationKey !== locationKey))

  // const toogleFav = locationKey => {
  //   console.log("locationKey", locationKey)
  //   const exists = favoriteCities.find(key => key.locationKey === locationKey)
  //   if(exists){
  //     removeFav(locationKey)
  //   } else {
  //     addToFav(locationKey)
  //   }

  // }

  

  const addToFavorite = (locationKey) => {
    // mark the heart icon
    if (favorite) {
      setFevorite(false);
    } else if (!favorite) {
      setFevorite(true);
      console.log('favorite',favorite)

    //set data to favorite page
    const addFav = locationKey => setFavoriteCities([...favoriteCities, {city: city, Key: locationKey}])
    const removeFav = locationKey => setFavoriteCities(favoriteCities.filter(key => key.Key !== locationKey))
    const exists = favoriteCities.find((key) => key.Key === locationKey)
    if(exists){
      return removeFav(locationKey)
    }else{
      return addFav(locationKey)
    }
    }
   
  }
  console.log('favoriteCities', favoriteCities)

  // useEffect(() => {
	// 	localStorage.setItem('favoriteCities', JSON.stringify(favoriteCities));
	// }, [favoriteCities]);

 
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