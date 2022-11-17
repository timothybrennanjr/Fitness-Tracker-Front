import {React, useState, useEffect} from 'react'
import { getAllPrivateRoutines, deleteRoutine } from '../api-adapter'
import { Link, useParams, useNavigate } from "react-router-dom";


const SingleRoutine = (props) => {

  const routine =props.routine


  return (
    <div>
        <h2>Routine Name: {routine.name}</h2>
        <div>Routine Goal: {routine.goal}</div>
        
   
   <Link to={`/routines/${routine.id}`}><button>Routine Details</button></Link>
    </div>
  )
}

export default SingleRoutine