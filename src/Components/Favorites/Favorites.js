import { LocationContext } from "../Context/CityContext";
import { useContext } from "react";
import FavoriteCard from "./FavoriteCard";


export default function FavoritePage() {
  const { favoriteCity } = useContext(LocationContext);

  // add to local Storage Favorite City

  //   useEffect(() => {
  //   localStorage.setItem('favoriteCity', JSON.stringify(favoriteCity))
  // },[favoriteCity])
console.log(favoriteCity)
  return (
    <div>
      <h1>Favorite Locations</h1>
      {favoriteCity.length > 0  && (
        <FavoriteCard />
      )}

    </div>
  );
}
