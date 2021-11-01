import React, { useContext } from "react";
import "./Search.css";
// import { debounce } from 'lodash';

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

 


  // const updateCity = debounce((text) => {
  //   setCity(text);
  //   getLocation()
  // }, 1000)

  const updateCity = (e) => setCity(e.target.value)
  


//   const getfilteredLocation = (city, location) => {
//     console.log('getfilteredLocation')
  
//     return location.filter((place) => place.LocalizedName.includes(city))
//  }
 
//  const filteredLocation = getfilteredLocation(city, location)

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
        className="input"
        placeholder="Enter City..."
        onChange={updateCity}
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
        : <p>Search City</p>}
    </div>
  );
}

export default Search;
