import React, { useContext, useEffect } from "react";
import { LocationContext } from "../Context/CityContext";
import "./FavoriteCard.css";
import { BiX } from "react-icons/bi";

function FavoriteCard() {
  const {
    favoriteCities,
    iconNum,
    setFavoriteCities,
    favoritesData,
    setFavoritesData,
    getCurrentConditionByKey,
  } = useContext(LocationContext);


  const removeFav = (locationKey) =>{
    setFavoriteCities(
      favoriteCities.filter((fav) => fav.Key !== locationKey)
    );
    
  }
 

  useEffect(() => {
    const promises = favoriteCities.map((favKey) => {
      const existsKey = favoriteCities.find((fav) => fav.Key === fav);
      if (existsKey) {
        return existsKey;  
      } 
        return getCurrentConditionByKey(favKey.Key);
    });

//     const existKey = favKey.Key
//     console.log(existKey);
//     if (favoriteCities.some(fav => fav.Key === existKey)) {
//         return existKey
//     } else {
//         return getCurrentConditionByKey(favKey.Key)
//     }
// })


    // console.log(promises);
    Promise.all(promises).then((response) => {
      const result = response.map((res, i) => {
        return {
          city: favoriteCities[i].city,
          key: favoriteCities[i].Key,
          weatherText: res[0].WeatherText,
          celsius: Math.round(res[0].Temperature.Metric.Value),
          weatherIcon: iconNum(res[0].WeatherIcon),
        };
      });

      setFavoritesData(result);
    });
    
  }, []);

  // console.log("favoritesData", favoritesData);
  // console.log("favoriteCities", favoriteCities);

  return (
    <div className="favorite-card">
      {favoritesData ? (
        favoritesData.map((fav, index) => (
          <div className="city-card" key={index}>
            <BiX
              className="remove-icon"
              onClick={() => removeFav(favoriteCities[index].Key)}
            />

            <h2>{fav.city}</h2>

            <img
              className="icon"
              src={
                favoritesData &&
                `https://developer.accuweather.com/sites/default/files/${fav.weatherIcon}-s.png`
              }
              alt="Weather App Icon"
            ></img>

            <h2 className="currentTemp">{fav.celsius || "N/A"}°C</h2>
            <p>{fav.weatherText || "N/A"}</p>
          </div>
        ))
      ) : (
        <p>No Favorite</p>
      )}
    </div>
  );
}

export default FavoriteCard;
