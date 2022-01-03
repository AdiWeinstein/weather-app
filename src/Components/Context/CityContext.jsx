import React, { createContext, useState, useEffect } from "react";

export const LocationContext = createContext({
  locatin: [],
  setLocation: () => [],
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
  onPickCity: () => {},
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
  const [city, setCity] = useState("");
  const [location, setLocation] = useState([]);
  const [locationKey, setLocationKey] = useState("215854");
  const [current, setCurrent] = useState([]);
  const [forcast, setForcast] = useState([]);
  const [favoriteCities, setFavoriteCities] = useState(
    JSON.parse(localStorage.getItem("favoriteCities")) || []
  );
  const [favorite, setFevorite] = useState(false);
  const [favoritesData, setFavoritesData] = useState();
  const [filteredData, setFilteredData] = useState(location);
  const [allFavData, setAllFavData] = useState([]);

  const apiKey = "VEJ6JVQGXbrkzk4PGSBLH4epf4qjA9VM";

  const getLocation = (e) => {
    // if (e.key === 'Enter' || city !== "" ){
    fetch(
      `http://dataservice.accuweather.com/locations/v1/cities/autocomplete?apikey=${apiKey}&q=${city}`
    )
      .then((response) => response.json())
      .then((data) => {
        console.log("Autocomplete data", data);
        setLocation(data);
      });
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
      fetch(
        `http://dataservice.accuweather.com/currentconditions/v1/${locationKey}?apikey=${apiKey}`
      )
        .then((response) => response.json())
        .then((data) => {
          console.log("current Weather", data);
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
      `http://dataservice.accuweather.com/currentconditions/v1/${locationKey}?apikey=${apiKey}`
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
      fetch(
        `http://dataservice.accuweather.com/forecasts/v1/daily/5day/${locationKey}?apikey=${apiKey}`
      )
        .then((response) => response.json())
        .then((data) => {
          console.log("forcast 5 days", data);
          setForcast(
            data.DailyForecasts.map((df) => {
              console.log("dayOfWeek", dayOfWeek[new Date(df.Date).getDay()]);
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
  const onPickCity = (city, i) => {
    setCity(location[i].LocalizedName);
    setLocationKey(location[i].Key);
    setLocation([]);

    console.log("city", city);
    console.log("locationKey", locationKey);
  };

  useEffect(() => {
    if (locationKey) {
      getCurrentCondition(locationKey);
      forcastFiveDays(locationKey);
    }
  }, [locationKey]);

  console.log("forcast", forcast);

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
        city,
        location,
        setCity,
        setLocation,
        getLocation,
        current,
        setCurrent,
        getCurrentCondition,
        forcast,
        setForcast,
        forcastFiveDays,
        locationKey,
        setLocationKey,
        onPickCity,
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
