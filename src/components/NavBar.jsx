import React from "react";
import { Register, Login } from "./";
import { NavLink } from "react-router-dom";

const NavBar = () => {
  async function logout() {
    localStorage.removeItem("token");
    localStorage.removeItem("username");
  }

  return (
    <div id="navbar">
      <Register />
      <Login />
      <div id="navLinkButtons">
      <NavLink to="/activities">
        <button>activities</button>
      </NavLink>
      <NavLink to="/myroutines">
        <button>My Routines</button>
      </NavLink>
      <NavLink to="/routines">
        <button>Routines</button>
      </NavLink>
      <NavLink to="/">
        <button>Home</button>
      </NavLink>
      </div>
    </div>
    
  );
};

export default NavBar;
