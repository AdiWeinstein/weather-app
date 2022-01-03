import "./App.css";
import React, {
  useContext,
  useEffect
} from "react";
import Header from "./Components/Header/Header";
// import InputLocation from "./InputLocation.js";
import HomeCard from "./Components/Home/HomeCard";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Favorites from "./Components/Favorites/Favorites.js";
import Search from './Components/Search/Search';
import { LocationContext } from "../src/Components/Context/CityContext";


function App() {
  const { setFavoriteCities } = useContext(LocationContext);

  // useEffect(() => {
  //   const getfavoriteCities = JSON.parse(
  //     localStorage.getItem('favoriteCities')
  //   )
  //   setFavoriteCities(getfavoriteCities)
  // }, [])

  return (
   
      <Router>
        <div className="App">
          <Header />
          
          <Switch>
            <Route path="/favorite">
              <Favorites/>
            </Route>
            <Route path="/" exact>
              <Search /> 
              <HomeCard />
            </Route>
          </Switch>
        </div>
      </Router>
    
  );
}

export default App;