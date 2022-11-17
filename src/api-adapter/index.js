const BASE_URL = "https://fitnesstrac-kr.herokuapp.com";

export async function registerUser(username, password) {
  const registerOptions = {
    method: "POST",
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify({
      username,
      password,
    }),
  };

  const response = await fetch(
    `${BASE_URL}/api/users/register`,
    registerOptions
  );

  const result = await response.json();
  console.log(result);
  return result;
}

export async function loginUser(username, password) {
  const loginOptions = {
    method: "POST",
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify({
      username,
      password,
    }),
  };
  const response = await fetch(`${BASE_URL}/api/users/login`, loginOptions);
  const result = await response.json();
  console.log(result);
  return result;
}

export async function getMe(token) {
 
  const options = {
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`,
    },
  };
  const response = await fetch(`${BASE_URL}/api/users/me`, options);
  const result = await response.json();
  console.log(result);
  return result;
}

export async function getUserRoutines() {
  const options = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  const response = await fetch(
    `${BASE_URL}/api/users/:username/routines`,
    options
  );
  const result = await response.json();
  console.log(result);
  return result;
}

export async function getAllActivities() {
  const options = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  const response = await fetch(`${BASE_URL}/api/activities`, options);
  const result = await response.json();
  console.log(result);
  return result;
}

export async function createActivity(name, description) {
  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${localStorage.getItem('token')}`
    },
    body: JSON.stringify({
      name,
      description,
    }),
  };
  const response = await fetch(`${BASE_URL}/api/activities`, options);
  const result = await response.json();
 
  console.log(result);
  return result;
}

export async function editActivity(name, description) {
  const options = {
    method: "PATCH",
    body: JSON.stringify({
      name,
      description,
    }),
  };
  const response = await fetch(
    `${BASE_URL}/api/activities/:activityId`,
    options
  );
  const result = await response.json();
  console.log(result);
  return result;
}

export async function getRoutinesByActivity() {
  const options = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  const response = await fetch(
    `${BASE_URL}/api/activities/:activityId/routines`,
    options
  );
  const result = await response.json();
  console.log(result);
  return result;
}

export async function getAllRoutines() {
  const options = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  const response = await fetch(`${BASE_URL}/api/routines`, options);
  const result = await response.json();
 
  return result;
}

export async function getAllPrivateRoutines(username) {
  const options = {
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${localStorage.getItem('token')}`
    },
  };
  const response = await fetch(`${BASE_URL}/api/users/${username}/routines`, options);
  const result = await response.json();
 
  return result;
}


export async function createRoutine(name, goal, isPublic) {
  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${localStorage.getItem('token')}`
    },
    body: JSON.stringify({
      name,
      goal,
      isPublic,
    }),
  };
  const response = await fetch(`${BASE_URL}/api/routines`, options);
  const result = await response.json();
  console.log(result);
  return result;
}

export async function editRoutine(name, goal, isPublic) {
  const options = {
    method: "PATCH",
    body: JSON.stringify({
      name,
      goal,
      isPublic,
    }),
  };
  const response = await fetch(`${BASE_URL}/api/routines/:routineId`, options);
  const result = await response.json();
  console.log(result);
  return result;
}

export async function deleteRoutine(routineId) {
  const options = {
    method: "DELETE",
    headers: {
      "Content-type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("token")} `,
    },
  };

  const response = await fetch(`${BASE_URL}/api/routines/${routineId}`, options);
  const result = await response.json();
  console.log(result);
  return result;
}


export async function attachActivityToRoutine(activityId, count, duration) {
    const options = {
      method: "POST",
      body: JSON.stringify({
        activityId,
        count,
        duration,
      }),
    };
    const response = await fetch(`${BASE_URL}/api/routines/:routineId/activities`, options);
    const result = await response.json();
    console.log(result);
    return result;
  }

  export async function editRoutineActivity(count, duration) {
    const options = {
      method: "PATCH",
      body: JSON.stringify({
        count,
        duration
      }),
    };
    const response = await fetch(`${BASE_URL}/api/routine_activities/:routineActivityId`, options);
    const result = await response.json();
    console.log(result);
    return result;
  }

  export async function deleteRoutineActivity() {
    const options = {
      method: "DELETE",
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")} `,
      },
    };
  
    const response = await fetch(`${BASE_URL}/api/routine_activities/:routineActivityId`, options);
    const result = await response.json();
    console.log(result);
    return result;
  }