import { LocationContext } from "../Context/CityContext";
import { useContext } from "react";
import FavoriteCard from "./FavoriteCard";

export default function FavoritePage() {
  const { favoriteCities } = useContext(LocationContext);

  return (
    <div>
      <h1>Favorite Locations</h1>
      {favoriteCities.length > 0 && <FavoriteCard />}
    </div>
  );
}
