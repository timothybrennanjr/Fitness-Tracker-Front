import { React, useState, useEffect } from "react";
import {
  NavBar,
  Register,
  Login,
  Profile,
  Routines,
  Activities,
  MyRoutines,
  RoutineDetail,
  RoutineActivity
} from "./";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { getAllPrivateRoutines, getAllRoutines, getMe } from "../api-adapter";

const Main = () => {
  const [loggedInUser, setLoggedInUser] = useState({});
  const [loggedIn, setLoggedIn] = useState(false);
  const [routines, setRoutines] = useState([]);
  const [makingRoutine, setMakingRoutine] = useState(false)
  const [userRoutines, setUserRoutines] = useState([]);

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

  useEffect(() => {
    async function fetchRoutines() {
      const allRoutines = await getAllRoutines();
      setRoutines(allRoutines);
    }
    fetchRoutines();
  }, []);

  function filterRoutines(id) {
    return routines.filter((routine) => {
      return routine.id == id;
    });
  }

  useEffect(() => {
    async function fetchUserRoutines() {
      const username = loggedInUser.username;
      if (username) {
        const allUserRoutines = await getAllPrivateRoutines(username);

        setUserRoutines(allUserRoutines);
      }
    }

    fetchUserRoutines();
  }, [loggedInUser]);

  function filterUserRoutines(id) {
    if (userRoutines) {
      return userRoutines.filter((routine) => {
        return routine.id == id;
      });
    }
  }

  return (
    <Router>
      <div id="main">
        <div id="navbar">
          <NavBar setLoggedIn={setLoggedIn} loggedIn={loggedIn} setMakingRoutine={setMakingRoutine}/>
        </div>
        <Routes>
          <Route path="/" element={<Routines />} />
          <Route
            path="/activities"
            element={
              <Activities
                loggedInUser={loggedInUser}
                loggedIn={loggedIn}
                setLoggedIn={setLoggedIn}
              />
            }
          />
          <Route
            path="/myroutines"
            element={
              <MyRoutines
                filterRoutines={filterRoutines}
                routines={routines}
                setRoutines={setRoutines}
                loggedInUser={loggedInUser}
              />
            }
          />
          <Route path="/routines" element={<Routines />} />
          <Route
            path="/routines/:routineId"
            element={
              <RoutineDetail
                userRoutines={userRoutines}
                filterUserRoutines={filterUserRoutines}
                routines={routines}
              />
            }
          />
          <Route
          path="/routine_activities/:routineActivityId"
          element={<RoutineActivity/>}/>
        </Routes>
      </div>
    </Router>
  );
};

export default Main;
