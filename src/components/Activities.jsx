import {React, useEffect, useState, useReducer} from "react";
import {  getAllActivities, createActivity } from "../api-adapter";


const Activities = (props) => {
const [activities, setActivities] = useState([])
const [name, setName]= useState("")
const [description, setDescription] = useState("")
const username = props.loggedInUser.username
const [reducerValue, forceUpdate] = useReducer(x => x + 1, 0);  

    useEffect(() => {
        async function fetchActivities() {
          const allActivities = await getAllActivities();
          setActivities(allActivities);
        }
        fetchActivities();
      }, [reducerValue]);

       
      const handleSubmit = async (e) => {
        e.preventDefault();
        const createdActivity = await createActivity(name, description)
        forceUpdate()
        if (createdActivity.error.includes("An activity")) {
          return (alert("An activity with that name already exists."))
        } 
   
      }
      
      
      return (


      
            <div className="activitiesBox">
<div className="submitPost">
    <h2> Hello, {username}! Add a New Activity:</h2>
    <form onSubmit={handleSubmit}>
      <label className="labels">Activity Name </label>
      <input
        type="text"
        required
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <label className="labels">Activity Description</label>
      <input
        type="text"
        required
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      ></input>


      
      <button>Create Activity</button>
     
    </form> </div>
 




            <h3 className="activitiesTitle"> List of Activities </h3>
            {activities ? (
              activities.map((activities) => {
              
                  return (
                    <div key={`activities${activities.id}`}>
                      <div className="activitiesContent">
                      <h4> Activity name: {activities.name} </h4>
                     Description: {activities.description}
                   
                      </div>
                    </div>
                  ) ;
              })
            ) : (
              <h2>No activities Currently</h2>
            )}





            
          </div>
        )
}
export default Activities