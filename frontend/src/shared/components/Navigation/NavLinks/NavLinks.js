import React, { useContext } from "react";
import { NavLink } from "react-router-dom";

import { AuthContext } from "../../../context/auth-context";
import "./NavLinks.css";

const NavLinks = () => {
  const { isLoggedIn, logout } = useContext(AuthContext);
  return (
    <ul className="nav-links">
      <li>
        <NavLink exact to="/">
          ALL USERS
        </NavLink>
      </li>
      {isLoggedIn && (
        <>
          <li>
            <NavLink to="/u1/places">MY PLACES</NavLink>
          </li>
          <li>
            <NavLink to="/places/new">ADD PLACES</NavLink>
          </li>
          <li>
            <NavLink onClick={logout} to="/auth">
              LOGOUT
            </NavLink>
          </li>
        </>
      )}
      {!isLoggedIn && (
        <li>
          <NavLink to="/auth">LOGIN</NavLink>
        </li>
      )}
    </ul>
  );
};

export default NavLinks;
