import React, { createContext, useState, useEffect } from "react";

export const LocationContext = createContext({
    locatin: [],
    setLocation: () => [],
    city: '',
    setCity: () => [],
    getLocation: ()=>[],
    current: [],
    setCurrent: () => {},
    getCurrentCondition: () => [],
    forcast: [],
    setForcast: () => {},
    forcastFiveDays: () => [],
    locationKey:'',
    setLocationKey:()=>[]

});

export default function CityProvider ({ children }){
    const [city, setCity] = useState("");
    const [location, setLocation] = useState([{}]);
    const [locationKey, setLocationKey]= useState("");
    const [current, setCurrent]= useState([])
    const [forcast, setForcast] = useState([])
  
    
    const apiKey = "eY7cCNHr3SGEIgacMiir8aQDn7aCXG8c";
    
    const getLocation = (e) => {
        if (e.key === 'Enter'){
          fetch(
              `http://dataservice.accuweather.com/locations/v1/cities/autocomplete?apikey=${apiKey}&q=${city}`
            )
              .then((response) => response.json())
              .then((data) => {
                console.log('Autocomplete data',data[0]);
                setLocation(data[0]);
                setCity('')
              });
              setLocationKey(location.Key)
              console.log('Key',location.Key);
        }
        // getCurrentCondition()
    }
    //fetch current weather
    const getCurrentCondition = (locationKey) => {
          fetch(
              `http://dataservice.accuweather.com/currentconditions/v1/${locationKey}?apikey=${apiKey}`
            )
              .then((response) => response.json())
              .then((data) => {
                console.log('current Weather',data);
                setCurrent(data);
              });
            }

            // fetch  5 daily forecast
            const forcastFiveDays = (locationKey) => {
                fetch(`http://dataservice.accuweather.com/forecasts/v1/daily/5day/${locationKey}?apikey=${apiKey}`)
                .then(response => response.json())
                .then(data =>{ 
                  console.log('forcast 5 days',data);
                  setForcast(data)
                })
            }

            useEffect(()=>{
              // if(locationKey){
                getCurrentCondition()
                forcastFiveDays()
              // }
           
            },[locationKey])


   
  
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
          setLocationKey
        }}
      >
        {children}
      </LocationContext.Provider>
    );
  };