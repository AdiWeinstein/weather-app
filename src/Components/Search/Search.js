import React, { useState, useEffect, useRef, useContext } from "react";
import './Search.css'
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import { useAutocomplete } from '@mui/core/AutocompleteUnstyled';
import {LocationContext} from '../Context/CityContext'
import { BiSearchAlt, BiX } from "react-icons/bi";

function Search() {
    const {location, setLocation, city, setCity, getLocation, setLocationKey, locationKey, getCurrentCondition,
        forcastFiveDays, onPickCity}= useContext(LocationContext)

   

  return (
    <div className='search'>

   <BiSearchAlt />
     <input
    className='input'
    placeholder='Enter City...'
    onChange={(e)=> setCity(e.target.value)}
    value={city}
    onKeyPress={getLocation}
    ></input>
    <BiX onClick={()=> setCity("")}/>
    {location.map((city,i) => {
        return <div><p className="citySearch" key={i} onClick={()=>onPickCity(city,i)}>{city.LocalizedName}</p></div>
    })}
    
    </div>
  );
}

export default Search;
