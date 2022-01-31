import React, { useEffect } from "react";
import "./header.css";
import { Link, NavLink } from "react-router-dom";

function Header() {
  
 

  return (
    <header className="Header">
      <div>
        <h2 className="Logo">My Weather App</h2>
      </div>

      <div>
        <nav>
          <ul>
            <li>
              <NavLink activeClassName="active-link" exact to="/" >
                HOME
              </NavLink>
            </li>
            <li>
              <NavLink activeClassName="active-link" to="/favorite">
                FAVORITE
              </NavLink>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}

export default Header;
