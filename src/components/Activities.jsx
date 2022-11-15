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

        console.log(activities)
        return (
            <div className="activitiesBox">
            <h3 className="activitiesTitle"> List of Activities </h3>
            {activities ? (
              activities.map((activities) => {
               
                  return (
                    <div key={`activities${activities.id}`}>
                      <div className="activitiesContent">
                        {activities.name} 
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