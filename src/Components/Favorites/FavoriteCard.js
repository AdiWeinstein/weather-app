import React, { useContext } from "react";
import { LocationContext } from "../Context/CityContext";
import './FavoriteCard.css';
import { BiX } from "react-icons/bi";


function FavoriteCard() {
  const { favoriteCity, iconNum, setFavoriteCity } = useContext(LocationContext);
  console.log("favoriteCity", favoriteCity);

  const removeCityFromFavorite = (city) => {
    const newFavoriteList = favoriteCity.filter((fav) => fav.city !== favoriteCity.city)
    setFavoriteCity(newFavoriteList)
  }

  return (
    <div className='favorite-card'>
      
      {favoriteCity &&
        favoriteCity.map((fav, index) => (
          <div className='city-card' key={index}>
            <BiX className="remove-icon" />
            <h2>{fav.city}</h2>
            <img
              className="icon"
              src={
                favoriteCity &&
                `https://developer.accuweather.com/sites/default/files/${iconNum(
                  fav.current[0].icon
                )}-s.png`
              }
              alt="Weather App Icon"
            ></img>

            <h2 className="currentTemp">{fav.current[0].celsius || "N/A"}°C</h2>
            <p>{fav.current[0].WeatherText || "N/A"}</p>
          </div>
         ))}
    </div>
  );
}

export default FavoriteCard;
