// import { LocationContext } from "../Context/CityContext";
// import React,{useContext} from 'react'

// export const FavoriteReducer = (state, action) => {
//     const {current} = useContext(LocationContext);
//     switch(action.type) {
//         case 'ADD_CITY':
//             return [...state, {
//               icon: action.current.icon,
//               celsius: Math.round(current.Temperature.Metric.Value),
//               WeatherText: current.WeatherText,
//               today: current.LocalObservationDateTime
//             }]
//         case 'REMOVE_CITY':
//             return state.filter(current => current.locationKey !== action.locationKey) 
//         default:
//                 return state
//     }
// }