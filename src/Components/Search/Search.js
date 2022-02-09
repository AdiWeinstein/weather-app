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

  const [isCity, setIsCity]= useState(false)

  // const updateCity = (e) => {
  //   console.log("1object", e);
  //   setInputSearch(e.target.value);
  // };
  // const debounceOnChange = useCallback(debounce(updateCity, 500), []);

  // useEffect(() => {
  //     getLocation(inputSearch);
  // }, [inputSearch]);


  const debouncedSave = useCallback(
    debounce((newValue) => getLocation(newValue), 1000),
    []
);

const updateValue = (newValue) => {
    setInputSearch(newValue);
    debouncedSave(newValue);
};

  const cleanInputValue = () => {
   
      setInputSearch("");
      setCity("")
      console.log("<<<city", city);
      console.log("<<<inputSearch",inputSearch );
      setFevorite(false);
  
    }
  
   
 

  //pick city from the autucomplete list
  const onPickCity = (city, i) => {
    setCity(locations[i].LocalizedName);
    setLocationKey(locations[i].Key);
    setLocations([])
    // setInputSearch("")

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
        // onChange={debounceOnChange}
        // value={city ? city : ""}
        value={inputSearch}
        onChange={(e) => updateValue(e.target.value)}
       
      ></input>

      {/* delete icon */}
      <BiX onClick={cleanInputValue} className="x-btn" />

      <ul className="loctions-list">{locations.length>0 && locationsList  }</ul>
    </div>
  );
}

export default Search;
