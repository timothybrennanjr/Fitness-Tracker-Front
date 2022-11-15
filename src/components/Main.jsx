import {React, useEffect, useState} from "react";
import { NavBar, Register, Login, Profile } from "./";
import { getMe } from "../api-adapter";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

const Main = () => {
  const [loggedInUser, setLoggedInUser] = useState({});
  const [loggedIn, setLoggedIn] = useState(false);

  const getMeData = async () => {
    const myself = await getMe(localStorage.getItem("token"));
    setLoggedInUser(myself);
   
    setLoggedIn(true);
  };
  
  useEffect(() => {
   
    if (localStorage.getItem("token")) {
      getMeData();
    }
  }, []);


  return (
    <Router>
      <div id="main">
        <div id="navbar">
        <Register /> <Login />
        </div>
        <div id="container">{<Profile loggedInUser={loggedInUser}/>}</div>
      </div>
    </Router>
  );
};

export default Main;
