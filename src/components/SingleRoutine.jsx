import {React, useState, useEffect} from 'react'
import { getAllPrivateRoutines, deleteRoutine } from '../api-adapter'
import { Link, useParams, useNavigate } from "react-router-dom";


const SingleRoutine = (props) => {

  const routine =props.routine


  return (
    <div>{routine.name}
   
   <Link to={`/routines/${routine.id}`}><button>Routine Details</button></Link>
    </div>
  )
}

export default SingleRoutine