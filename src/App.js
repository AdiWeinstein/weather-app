import "./App.css";
import Header from "./Components/Header/Header";
// import InputLocation from "./InputLocation.js";
import HomeCard from "./Components/Home/HomeCard";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import FavoritePage from "./Components/Favorits/Favorits";
import Search from './Components/Search/Search'


function App() {
  return (
   
      <Router>
        <div className="App">
          <Header />
          <Search /> 
          <Switch>
            <Route path="/favorite">
              <FavoritePage />
            </Route>
            <Route path="/" exact>
              <HomeCard />
            </Route>
          </Switch>
        </div>
      </Router>
    
  );
}

export default App;