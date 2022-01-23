import React, { useContext, useEffect, useCallback } from "react";
import "./Search.css";
import { debounce } from "lodash";

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
    setForcast,
    setFevorite,
  } = useContext(LocationContext);

  const updateCity = (e) => {
    console.log('object', e)
    setCity(e.target.value)
    // getLocation()
  };
  const debounceOnChange = useCallback(debounce(updateCity,500), []) ;

  useEffect(() => {
    getLocation(city)
  }, [city]);

  const cleanInput = () => {
    setCity("");
    setLocation([]);
    setCurrent([]);
    setForcast([]);
    setFevorite(false);
  };

  return (
    <div className="search">
      <BiSearchAlt />
      <input
        type="text"
        className="input"
        placeholder="Search City..."
        // onChange={updateCity}
        onChange={debounceOnChange}
        // value={city}                   
        // name="city"
        // onKeyPress={handler}
      ></input>

      {/* delete icon */}
      <BiX onClick={cleanInput} />
      {location ? (
        location.map((city, i) => {
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
      ) : (
        <p>Search City</p>
      )}
    </div>
  );
}

export default Search;
