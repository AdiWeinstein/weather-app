import React, { useState, useEffect, useRef, useContext } from "react";
import './Search.css'
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import { useAutocomplete } from '@mui/core/AutocompleteUnstyled';
import {LocationContext} from '../Context/CityContext'
import { BiSearchAlt } from "react-icons/bi";

function Search() {
    const {location, setLocation, city, setCity, getLocation}= useContext(LocationContext)
//   const [location, setLocation] = useState([]);
//   const [city, setCity ]=useState('')
//   const [weatherData, setWeatherData] = useState([{}])
//   const [ cityKey, setCityKey] = useState('')
//   const apiKey = "YWA7ChJumIf2tQwk5Slw8Ll3VKPKroO5";
//   const inputRef = useRef()
//  const cityKey = location[0].Key
//  console.log('key' , cityKey)

//get Autocomplete Url
//   useEffect(() =>{
//      fetch(
//       `http://dataservice.accuweather.com/locations/v1/cities/autocomplete?apikey=${apiKey}&q=${city}`
//     )
//       .then((response) => response.json())
//       .then((data) => {
//         console.log('Autocomplete data',data);
//         setLocations(data);
//       });
//   }, []);

//   const getLocation = (e) => {
//       if (e.key === 'Enter'){
//         fetch(
//             `http://dataservice.accuweather.com/locations/v1/cities/autocomplete?apikey=${apiKey}&q=${city}`
//           )
//             .then((response) => response.json())
//             .then((data) => {
//               console.log('Autocomplete data',data);
//               setLocation(data);
//               setCity('')
//             });
//       }
//   }
    

  return (
    <div>
   
      {/* <Autocomplete
 
        value={city}
        onChange={(e)=> setCity(e.target.value)}
        disablePortal
        id="input_location"
        options={location}
        getOptionLabel={(location) => location.LocalizedName}
        // getOptionSelected={(value) => getKey(value)} 
        sx={{ width: 300, alignItems:'center' }}
        renderInput={(params) => <TextField {...params} label="Location" />}
      /> */}
   <BiSearchAlt />
     <input
    className='input'
    placeholder='Enter City...'
    onChange={(e)=> setCity(e.target.value)}
    value={city}
    onKeyPress={getLocation}
    ></input>
    
    </div>
  );
}

export default Search;
