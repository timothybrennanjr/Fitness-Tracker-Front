import { React, useState, useEffect, useReducer } from "react";
import {
  createRoutine,
  getAllRoutines,
  deleteRoutine,
  getAllPrivateRoutines,
} from "../api-adapter";

import {Link} from "react-router-dom"
import SingleRoutine from "./SingleRoutine";
import RoutineActivity from "./RoutineActivity";


const MyRoutines = (props) => {
  const [name, setName] = useState("");
  const [goal, setGoal] = useState("");
  const [isPublic, setIsPublic] = useState(false);
  const [userRoutines, setUserRoutines] = useState([]);
  const [reducerValue, forceUpdate] = useReducer((x) => x + 1, 0);
  const username = props.loggedInUser.username;
 
  console.log(userRoutines)

  useEffect(() => {
    async function fetchRoutines() {
      console.log("I am fetching routines");
      const allRoutines = await getAllPrivateRoutines(username);
      setUserRoutines(allRoutines);
    }

    username && fetchRoutines();
  }, [username, reducerValue]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const createdRoutine = await createRoutine(name, goal, isPublic);
    forceUpdate();
    if (createdRoutine.error.includes("duplicate key")) {
      return alert("A routine with that name already exists.");
    }
  };

  const handleChange = (e) => {
    if (e.target.checked) {
      console.log(" Checkbox is checked");
    } else {
      console.log("Checkbox is NOT checked");
    }
    setIsPublic((current) => !current);
  };

  return (
    <div className="submitPost">
      <h2> Hello, {username}! Add a New Routine:</h2>
      <form onSubmit={handleSubmit}>
        <label className="labels">Routine Name </label>
        <input
          type="text"
          required
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <label className="labels">Routine Goal</label>
        <input
          type="text"
          required
          value={goal}
          onChange={(e) => setGoal(e.target.value)}
        ></input>
        <label htmlFor="isPublic"> Would you like to make this Public?</label>
        <input
          type="checkbox"
          id="isPublic"
          name="isPublic"
          value={isPublic} // does value needs to be something else?
          onChange={handleChange}
        />

        <button>Create Routine</button>
      </form>

      <div className="routinesBox">
        <h3 className="routineTitle"> List of Routines </h3>

        {userRoutines && userRoutines.length ? (
          userRoutines.map((routine) => {
            
              return (
                <div key={`routine${routine.id}`}>
                 
            
                

                  <div className="routineContent">
                  <SingleRoutine 
                  key={`routine${routine.id}`}
                  routine={routine}
                  filterRoutines ={props.filterRoutines}
                  />
                   
                  </div>
                  <h4>Routine activities</h4>

                  <div>
                    {routine.activities && routine.activities.length ? (
                      routine.activities.map((activity) => {
                        return (
                          <div key={`activity${activity.id}`}>
                            <div className="activityContent">
                              <h5>Routine Activity Name: {activity.name}</h5>
                              <br></br>
                              description: {activity.description}
                              <br></br>
                              duration: {activity.duration}
                              <br></br>
                              count : {activity.count}
                              <Link to={`/routine_activities/${activity.routineActivityId
}`}><button>Routine Activity Details</button></Link>
                            
                            </div>
                          </div>
                        );
                      })
                    ) : (
                      <h2>No activities</h2>
                    )}{" "}
                    
                  </div>



                  
                
                  
                </div>
              );
          })
          
        ) : (
          <h2>No Routines Currently</h2>
        )}
       
      </div>
    </div>
  );
};

export default MyRoutines;
