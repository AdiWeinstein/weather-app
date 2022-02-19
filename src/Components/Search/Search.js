import React, { useContext, useEffect, useCallback, useState } from "react";
import "./Search.css";
import { debounce } from "lodash";

import { LocationContext } from "../Context/CityContext";
import { BiSearchAlt, BiX } from "react-icons/bi";

function Search() {
  const {
    inputSearch,
    setInputSearch,
    locations,
    setLocations,
    setLocationKey,
    city,
    setCity,
    getLocation,
    setCurrent,
    setForcast,
    setFevorite,
  } = useContext(LocationContext);


  const debouncedSave = useCallback(
    debounce((newValue) => getLocation(newValue), 500),
    []
  );

  const updateValue = (newValue) => {
    setInputSearch(newValue);
    debouncedSave(newValue);
  };

  const cleanInputValue = () => {
    setInputSearch("");
    setCity("");
    setFevorite(false);
    setLocationKey("215854")
  };
 

  //pick city from the autucomplete list
  const onPickCity = (city, i) => {
    setCity(locations[i].LocalizedName);
    setLocationKey(locations[i].Key);
    setLocations([]);
    
  };

  const locationsList = locations.map((location, i) => {
    return (
      <li className="citySearch" key={i} onClick={() => onPickCity(city, i)}>
        {location.LocalizedName}
      </li>
    );
  });

  return (
    <div className="search">
      <BiSearchAlt />

      <input
        type="text"
        className="input"
        placeholder="Search City..."
        value={inputSearch}
        onChange={(e) => updateValue(e.target.value)}
      ></input>

      {/* delete icon */}
      <BiX onClick={cleanInputValue} className="x-btn" />

      <ul className="loctions-list">{locations.length > 0 && locationsList}</ul>
    </div>
  );
}

export default Search;
