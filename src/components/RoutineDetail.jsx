import React, { useState,useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { deleteRoutine } from "../api-adapter";
const RoutineDetail = (props) => {
    // const [singleFilteredRoutine, setSingleFilteredRoutine] = useState({})  
  
    // // coming from the routineId route
    // const {routineId} = useParams()
    //   if(routineId) {
    //       const filteredRoutine = props.filterRoutines(routineId);
    //   setSingleFilteredRoutine(filteredRoutine)
   
    //   }
      
    //   console.log(props)
    
    const [singleFilteredRoutine, setSingleFilteredRoutine] = useState({})  
    const navigate = useNavigate();


    const {routineId}= useParams();
    useEffect(() => {
    if (routineId) {
        const filteredRoutine = props.filterUserRoutines(routineId);
        setSingleFilteredRoutine(filteredRoutine)

    } },[props.userRoutines])

 async function handleDelete(e) {
    e.preventDefault();

    const deleted = await deleteRoutine(routineId);
    if (deleted.success) {
        navigate('/myroutines')
    }
  }



console.log(singleFilteredRoutine)
  return (
  <div className= "SingleRoutine">
      {
          singleFilteredRoutine && singleFilteredRoutine.length ?     <>
          <div>RoutineDetail</div>
          <div> Name: {singleFilteredRoutine[0].name}</div>
          <div>{singleFilteredRoutine[0].goal}</div>
          <button onClick={handleDelete} >Delete Routine</button>
        
          </> : null
          
        }
    </div>
      )
}

export default RoutineDetail