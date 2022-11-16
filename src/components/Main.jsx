import {React, useState, useEffect} from "react";
import { NavBar, Register, Login, Profile, Routines, Activities, MyRoutines } from "./";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import {getMe} from '../api-adapter'

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
        <NavBar />
        </div>
        <Routes>
          <Route path="/" element={<Routines />} />
          <Route path="/activities" element={<Activities />} />
          <Route path="/myroutines" element={<MyRoutines loggedInUser={loggedInUser}/>} /> 
          <Route path="/routines" element={<Routines />} /> 
        </Routes>
        <div id="container">
          {/* <Activities />
          <Routines />  */}
        </div>  
      </div>
    </Router>
  );
};

export default Main;
