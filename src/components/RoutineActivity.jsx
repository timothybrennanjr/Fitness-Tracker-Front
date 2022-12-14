import {React, useEffect, useState} from 'react'
import {useParams, useNavigate} from "react-router-dom"
import { editRoutineActivity, deleteRoutineActivity} from '../api-adapter'

const RoutineActivity = () => {

const params = useParams()

const {routineActivityId} = params
const [count, setCount] = useState(0)
const [duration, setDuration] = useState(0)
const navigate = useNavigate()


async function handleSubmit(e) {
    e.preventDefault()
 
const edited = await editRoutineActivity(Number(count), Number(duration), routineActivityId)
if (edited){
    navigate("/myroutines")

}
}

async function handleDelete(e) {
    e.preventDefault();

    const deleted = await deleteRoutineActivity(routineActivityId);
    if (deleted.success) {
      navigate("/myroutines");
    }
  }
  function handleBack(e) {
    e.preventDefault();
    navigate("/myroutines");
  }

  return (
    <div id='singleEditRoutineActivity'>
<div id='editRoutineActivity'>
    <form onSubmit={handleSubmit}>
            <label className="labels"> Change Count:  </label>
            <input
              type="number"
              required
              value={count}
              onChange={(e) => setCount(e.target.value)}
            />
            <label className="labels"> Change Goal: </label>
            <input
              type="number"
              required
              value={duration}
              onChange={(e) => setDuration(e.target.value)}
            ></input>
            
            <button type="submit" >Edit Routine Activity</button>
          </form>
          <button onClick={handleDelete}>Delete Routine Activity</button>
          <button onClick={handleBack}>Go Back</button>
    
        </div>
    </div>
    
  )
}

export default RoutineActivity