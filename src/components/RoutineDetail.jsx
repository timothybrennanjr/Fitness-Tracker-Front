import React, { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import {
  attachActivityToRoutine,
  deleteRoutine,
  getAllActivities,
} from "../api-adapter";
import { EditRoutine } from "./";
const RoutineDetail = (props) => {
  const [activities, setActivities] = useState([]);
  const [singleFilteredRoutine, setSingleFilteredRoutine] = useState({});
  const [editActive, setEditActive] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchActivities() {
      const allActivities = await getAllActivities();
      setActivities(allActivities);
    }
    fetchActivities();
  }, []);

  const { routineId } = useParams();
  useEffect(() => {
    if (routineId) {
      const filteredRoutine = props.filterUserRoutines(routineId);
      setSingleFilteredRoutine(filteredRoutine);
    }
  }, [props.userRoutines]);

  async function handleDelete(e) {
    e.preventDefault();

    const deleted = await deleteRoutine(routineId);
    if (deleted.success) {
      navigate("/myroutines");
    }
  }

  function handleBack(e) {
    e.preventDefault();
    navigate("/myroutines");
  }

  const [selectedActivity, setSelectedActivity] = useState();

  const handleSelectChange = (event) => {
    const id = event.target.value;
    const chosenActivity = activities.find((activity) => activity.id == id);
    setSelectedActivity(chosenActivity);
  };

  const [count, setCount] = useState(0);
  const [duration, setDuration] = useState(0);
  console.log(selectedActivity);
  async function handleAttach(e) {
    e.preventDefault();
    const activityId = Number(selectedActivity.id);
    const attached = await attachActivityToRoutine(
      Number(activityId),
      Number(count),
      Number(duration),
      routineId
    );
    console.log(attached);

    navigate("/myroutines");
  }

  return (
    <div className="SingleRoutine">
      {singleFilteredRoutine && singleFilteredRoutine.length ? (
        <>
        <div id="singleRoutineDetails">
        <div>RoutineDetail</div>
          <div> Name: {singleFilteredRoutine[0].name}</div>
          <div>{singleFilteredRoutine[0].goal}</div>
          <button onClick={handleBack}>Go Back</button>
          <div id="attachActivityForm">
            <select onChange={handleSelectChange}>
              {activities.map((activity) => (
                <option key={activity.id} value={activity.id}>
                  {activity.name}
                </option>
              ))}
            </select>
            <form onSubmit={handleAttach}>
              <label className="labels">Count </label>
              <input
                type="number"
                required
                value={count}
                onChange={(e) => setCount(e.target.value)}
              />
              <label className="labels">Duration</label>
              <input
                type="number"
                required
                value={duration}
                onChange={(e) => setDuration(e.target.value)}
              ></input>

              <button type="submit">Attach Activity To Routine</button>
            </form>
          </div>
        </div>
          

          <button onClick={handleDelete}>Delete Routine</button>
          {editActive ? (
            <EditRoutine
              editActive={editActive}
              setEditActive={setEditActive}
            />
          ) : (
            <button
              onClick={() => {
                setEditActive(true);
              }}
            >
              {" "}
              Edit Routine{" "}
            </button>
          )}
        </>
      ) : null}
    </div>
  );
};

export default RoutineDetail;
