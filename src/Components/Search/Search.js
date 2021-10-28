import React, { useState, useEffect, useRef, useContext } from "react";
import "./Search.css";
import { debounce, throttle } from 'lodash';

import { LocationContext } from "../Context/CityContext";
import { BiSearchAlt, BiX } from "react-icons/bi";

function Search() {
  const {
    location,
    setLocation,
    city,
    setCity,
    getLocation,
    onPickCity,
    setCurrent,
    setForcast
  } = useContext(LocationContext);

 
 

  const updateCity = (e) => {
    const nextValue = e?.target?.value;
    console.log('nextValue' , nextValue)
    setCity(nextValue)
    const delayedOnChange = debounce((nextValue)=>setCity(nextValue), 1000);
    delayedOnChange()
  };
  
 
  

  const cleanInput = () => {
    setCity("");
    setLocation([]);
    setCurrent([]);
    setForcast([]);
  };

  return (
    <div className="search">
      <BiSearchAlt />
      <input
        className="input"
        placeholder="Enter City..."
        onChange={(e) => updateCity(e)}
        value={city}
        onKeyPress={getLocation}
      ></input>

      {/* delete icon */}
      <BiX onClick={cleanInput} />
      {location
        ? location.map((city, i) => {
            return (
              <p
                className="citySearch"
                key={i}
                onClick={() => onPickCity(city, i)}
              >
                {city.LocalizedName}
              </p>
            );
          })
        : null}
    </div>
  );
}

export default Search;
