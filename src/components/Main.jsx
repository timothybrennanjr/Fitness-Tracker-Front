import React from "react";
import { NavBar, Register, Login } from "./";

import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

const Main = () => {
  return (
    <Router>
      <div id="main">
        <div id="navbar">
        <Register /> <Login />
        </div>
        <div id="container">{/* your components here */}</div>
      </div>
    </Router>
  );
};

export default Main;
