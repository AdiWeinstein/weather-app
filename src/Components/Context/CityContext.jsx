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
  iconNum:( )=> {}
});

export default function CityProvider({ children }) {
  const [city, setCity] = useState("");
  const [location, setLocation] = useState([{}]);
  const [locationKey, setLocationKey] = useState("");
  const [current, setCurrent] = useState([]);
  const [forcast, setForcast] = useState([]);
  const [cityInfo, setCityInfo] = useState([])

  const apiKey = "dmGRjl2NkdmY0G4pG3UrE8N6UTBFYoqi";

  const getLocation = (e) => {
    // if (e.key === 'Enter'){
    fetch(
      `http://dataservice.accuweather.com/locations/v1/cities/autocomplete?apikey=${apiKey}&q=${city}`
    )
      .then((response) => response.json())
      .then((data) => {
        console.log("Autocomplete data", data);
        setLocation(data);
        // setCity('')
      });

    // }
    // getCurrentCondition()
  };

  //fetch current weather
  // const getCurrentCondition = (locationKey) => {
  //   if (locationKey) {
  //     fetch(
  //       `http://dataservice.accuweather.com/currentconditions/v1/${locationKey}?apikey=${apiKey}`
  //     )
  //       .then((response) => response.json())
  //       .then((data) => {
  //         console.log("current Weather", data);
  //         setCurrent(data);
  //       });
  //   }
  // };


  //fetch current weather
    const getCurrentCondition = (locationKey) => {
    if (locationKey) {
      fetch(
        `http://dataservice.accuweather.com/currentconditions/v1/${locationKey}?apikey=${apiKey}`
      )
        .then((response) => response.json())
        .then((data) => {
          console.log("current Weather", data);
          setCurrent(data.map((cityInfo) => {
            return {
              icon: cityInfo.WeatherIcon,
              temp: Math.round(cityInfo.Temperature.Imperial.Value),
              WeatherText: cityInfo.WeatherText,
              today: cityInfo.LocalObservationDateTime
            }
          }));
        });
    }
  };


  // fetch  5 daily forecast
  // const forcastFiveDays = (locationKey) => {
  //   if (current) {
  //     fetch(
  //       `http://dataservice.accuweather.com/forecasts/v1/daily/5day/${locationKey}?apikey=${apiKey}`
  //     )
  //       .then((response) => response.json())
  //       .then((data) => {
  //         console.log("forcast 5 days", data);
  //         setForcast(data.DailyForecasts);
  //       });
  //   }
  // };

  
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
          setForcast(data.DailyForecasts.map(df => {
            console.log("dayOfWeek", dayOfWeek[new Date(df.Date).getDay()])
            return{
              min: df.Temperature.Minimum.Value,
              max: df.Temperature.Maximum.Value,
              dayOfWeek: dayOfWeek[new Date(df.Date).getDay()],
              icon: df.Day.Icon,
              iconPhrase: df.Day.IconPhrase
            }
          }));
        });
    }
  };


  const onPickCity = (city,i) => { 
    setCity(location[i].LocalizedName)
    setLocationKey(location[i].Key)
    setLocation([])
    
    console.log('city', city)
    console.log('locationKey', locationKey)

   }
 

  useEffect(() => {
    if(locationKey){
    getCurrentCondition(locationKey);
    forcastFiveDays(locationKey);
    }
  }, [locationKey]);

  const iconNum = (num) => {
    const stringNum = num + "";
    const stringLen = stringNum.length;

    if (stringLen === 1) {
      return "0" + stringNum;
    } else {
      return stringNum;
    }
  };


 

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
        iconNum
      }}
    >
      {children}
    </LocationContext.Provider>
  );
}
