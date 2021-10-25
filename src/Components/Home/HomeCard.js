// import DayTemp from "./DayTemp.js";
import "./HomeCard.css";
import React, { useState, useEffect, useRef, useContext } from "react";
import { MdOutlineFavoriteBorder, MdOutlineFavorite } from "react-icons/md";
import {LocationContext} from '../Context/CityContext'
import DayTemp from './DayTemp.js'




export default function HomeCard() {
  const {location, current, forcast, getCurrentCondition, forcastFiveDays, locationKey}= useContext(LocationContext)

 
  const [fevoriteBtn, setFevoriteBtn] = useState(0);
  const [ addFavorite, setAddFevorite] = useState(false)

//   const cityKey = location[0].Key


  function addToFavorite(e) {
    if(addFavorite){
        setAddFevorite(false)
    } else if(!addFavorite){
        setAddFevorite(true)
    }
  }

  return (
     
    <div className="Card">
      <div className="topLine">
        <div className="cityTemp">
          <img className="icon" alt="Weather App Icon"></img>
          <div className="city">
              {location && <div><h2>{location.LocalizedName}</h2>
              <p>{current.LocalObservationDateTime}<span>&#176;</span>C</p>
              </div>
              }
          </div>
        </div>
   
        <div className="favoriteBtn" onClick={addToFavorite}>
            {(addFavorite) 
            ? <MdOutlineFavorite size="1.5em" /> 
            :  <MdOutlineFavoriteBorder size="1.5em" />} 
        </div>
      </div>

      <h1>Sunny Day</h1>
      <DayTemp />
    </div>
  );
}
