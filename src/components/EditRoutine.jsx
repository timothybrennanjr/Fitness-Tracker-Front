import {React, useState} from 'react'
import { useParams } from 'react-router';
import { editRoutine } from '../api-adapter';

const EditRoutine = (props) => {
  const {editActive, setEditActive} = props
    
const {routineId} = useParams();
const [name, setName] = useState("");
const [goal, setGoal] = useState("");
const [isPublic, setIsPublic] = useState(false);


const handleSubmit = async (e) => {
  e.preventDefault();
  const editedRoutine = await editRoutine(name, goal, isPublic);
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
    <div>
<form onSubmit={handleSubmit}>
        <label className="labels"> Routine Name </label>
        <input
          type="text"
          required
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <label className="labels"> Routine Goal</label>
        <input
          type="text"
          required
          value={goal}
          onChange={(e) => setGoal(e.target.value)}
        ></input>
        <label htmlFor="isPublic"> Would you like to make this Public? </label>
        <input
          type="checkbox"
          id="isPublic"
          name="isPublic"
          value={isPublic} // does value needs to be something else?
          onChange={handleChange}
        />
        <button>Edit Routine</button>
      </form>
      <button onClick={() => {setEditActive(false)}}>Cancel Edit</button>

    </div>
  )
}

export default EditRoutine