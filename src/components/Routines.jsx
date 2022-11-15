import {React, useEffect, useState} from "react";
import { getUserRoutines, getAllRoutines } from "../api-adapter";


const Routines = (props) => {
const [routines, setRoutines] = useState([])

    useEffect(() => {
        async function fetchRoutines() {
          const allRoutines = await getAllRoutines();
          setRoutines(allRoutines);
        }
        fetchRoutines();
      }, []);


        return (
            <div className="routinesBox">
            <h3 className="routineTitle"> List of Routines </h3>
            {routines && routines.length ? (
              routines.map((routine) => {
              console.log(routine.activities, "testingggggg")
                  return (
                    <div key={`routine${routine.id}`}>
                      <div className="routineContent">
                        <h3>Name: {routine.name}</h3>
                        <br></br>
                        Goal: {routine.goal}
                        <br></br>
                        Creator: {routine.creatorName}
                      </div>
                      <h4>Routine activities</h4>
                      <div>
                        {routine.activities && routine.activities.length ? (
                          routine.activities.map((activity) => {
                              return (
                                <div key={`activity${activity.id}`}>
                                  <div className="activityContent">
                                    <h5>Name: {activity.name}</h5>
                                    <br></br>
                                    description: {activity.description}
                                    <br></br>
                                    duration: {activity.duration}
                                  </div>
                                </div>
                              )})): <h2>No activities</h2>} ;
                      </div>
                    </div>
                  ) ;
              })
            ) : (
              <h2>No Routines Currently</h2>
            )}
            </div>
        )
}

export default Routines