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
    </div>
  );
};

export default NavBar;
