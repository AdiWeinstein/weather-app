import React, { createContext, useState, useEffect } from "react";
import { callAPI, BASE_URL, API_KEY } from "../api/Service";


export const LocationContext = createContext({
  inputSearch:"",
  setInputSearch: () => [],
  locations: [],
  setLocations: () => [],
  city: "",
  setCity: () => [],
  getLocation: () => [],
  current: [],
  setCurrent: () => {},
  getCurrentCondition: () => [],
  forcast: [],
  setForcast: () => {},
  forcastFiveDays: () => [],
  locationKey: "",
  setLocationKey: () => [],
  // onPickCity: () => {},
  iconNum: () => {},
  toCelsius: () => {},
  ToFahrenheit: () => {},
  favoriteCities: [],
  setFavoriteCities: () => {},
  favorite: "",
  setFavorite: () => {},
  filteredData: [],
  setFilteredData: () => {},
  favoritesData: [],
  setFavoritesData: () => {},
  getCurrentConditionByKey: () => {},
  allFavData: [],
  setAllFavData: () => {},
});

export default function CityProvider({ children }) {
  const [inputSearch, setInputSearch] = useState("")
  const [city, setCity] = useState("");
  const [locations, setLocations] = useState([]);
  const [locationKey, setLocationKey] = useState("215854");
  const [current, setCurrent] = useState([]);
  const [forcast, setForcast] = useState([]);
  const [favoriteCities, setFavoriteCities] = useState(
    JSON.parse(localStorage.getItem("favoriteCities")) || []
  );
  const [favorite, setFevorite] = useState(false);
  const [favoritesData, setFavoritesData] = useState();
  const [filteredData, setFilteredData] = useState(locations);
  const [allFavData, setAllFavData] = useState([]);

  // const BASE_URL = "http://dataservice.accuweather.com";
  // const API_KEY = "No8wECVJQW4PQOAnNHTHYdmDrtPOZWHt";



  //autocomplete search
  const getLocation = (city) => {

  const url = 'locations/v1/cities/autocomplete';
  console.log(city,"city");
  callAPI(url, city)
      .then((data) => {
        console.log("Autocomplete data", data);
        setLocations(data);
      });
    // console.log(locations, "location");
  };

  

  //convert celsius to fahrenheit
  const ToFahrenheit = (celsius) => {
    return Math.round(celsius * (9 / 5) + 32);
  };

  function toCelsius(fahrenheit) {
    return Math.round(((fahrenheit - 32) * 5) / 9);
  }

  //fetch current weather
  const getCurrentCondition = () => {
    if (locationKey) {
    const url = `currentconditions/v1/${locationKey}`;
    callAPI(url, undefined)
        .then((data) => {
          // console.log("current Weather", data);
          setCurrent(
            data.map((cityInfo) => {
              return {
                icon: cityInfo.WeatherIcon,
                celsius: Math.round(cityInfo.Temperature.Metric.Value),
                fahrenheit: Math.round(cityInfo.Temperature.Imperial.Value),
                WeatherText: cityInfo.WeatherText,
                today: cityInfo.LocalObservationDateTime,
              };
            })
          );
        });
    }
  };

  async function getCurrentConditionByKey(locationKey) {
    const res = await fetch(
      `${BASE_URL}/currentconditions/v1/${locationKey}?apikey=${API_KEY}`
    );
    const data = await res.json();
    return data;
  }

  // fetch  5 daily forecast

  const forcastFiveDays = (locationKey) => {
    const dayOfWeek = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];
    if (current) {
      const url = `forecasts/v1/daily/5day/${locationKey}`;
    callAPI(url)
        .then((data) => {
          // console.log("forcast 5 days", data);
          setForcast(
            data.DailyForecasts.map((df) => {
              // console.log("dayOfWeek", dayOfWeek[new Date(df.Date).getDay()]);
              return {
                fahrenheit: {
                  min: df.Temperature.Minimum.Value,
                  max: df.Temperature.Maximum.Value,
                },
                celsius: {
                  min: toCelsius(df.Temperature.Minimum.Value),
                  max: toCelsius(df.Temperature.Maximum.Value),
                },
                dayOfWeek: dayOfWeek[new Date(df.Date).getDay()],
                icon: df.Day.Icon,
                iconPhrase: df.Day.IconPhrase,
              };
            })
          );
        });
    }
  };

 

  //pick city from the autucomplete list
  // const onPickCity = (city, i) => {
  //   console.log("city search",city)
  //   console.log("------location search",location)
  //   setCity(location[i].LocalizedName);
  //   setLocationKey(location[i].Key);
  //   setLocation([]);
  //   cleanInput()

    
  //   console.log(">>>>location search 2",location)

  // };
  
  // console.log("city", city);
  // console.log("locationKey", locationKey);
  // console.log("location", location);

  useEffect(() => {
    if (locationKey) {
      getCurrentCondition(locationKey);
      forcastFiveDays(locationKey);
    }
  }, [locationKey]);

  // console.log("forcast", forcast);

  // if icon num return one digit add "0" before
  const iconNum = (num) => {
    const stringNum = num + "";
    const stringLen = stringNum.length;

    if (stringLen === 1) {
      return "0" + stringNum;
    } else {
      return stringNum;
    }
  };

  useEffect(() => {
    localStorage.setItem("favoriteCities", JSON.stringify(favoriteCities));
  }, [favoriteCities]);

  return (
    <LocationContext.Provider
      value={{
        inputSearch,
        setInputSearch,
        city,
        locations,
        setCity,
        setLocations,
        getLocation,
        current,
        setCurrent,
        getCurrentCondition,
        forcast,
        setForcast,
        forcastFiveDays,
        locationKey,
        setLocationKey,
        // onPickCity,
        iconNum,
        toCelsius,
        ToFahrenheit,
        favoriteCities,
        setFavoriteCities,
        favorite,
        setFevorite,
        filteredData,
        setFilteredData,
        favoritesData,
        setFavoritesData,
        getCurrentConditionByKey,
        allFavData,
        setAllFavData,
      }}
    >
      {children}
    </LocationContext.Provider>
  );
}
