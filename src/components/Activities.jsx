import {React, useEffect, useState} from "react";
import {  getAllActivities } from "../api-adapter";


const Activities = (props) => {
const [activities, setActivities] = useState([])

    useEffect(() => {
        async function fetchActivities() {
          const allActivities = await getAllActivities();
          setActivities(allActivities);
        }
        fetchActivities();
      }, []);

       
        return (
            <div className="activitiesBox">
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