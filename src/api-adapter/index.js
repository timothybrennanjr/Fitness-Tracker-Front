const BASE_URL = "https://fitnesstrac-kr.herokuapp.com"


export async function registerUser(username, password) {
const registerOptions = {
    method: "POST",
    headers: {
        "Content-type": "application/json",
    }, 
    body: JSON.stringify({
            username,
            password,
        },
    ),
};

const response = await fetch(`${BASE_URL}/api/users/register`,
registerOptions
);

const result = await response.json();
return result
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
    })};
    const response = await fetch(`${BASE_URL}/api/users/login`,
    loginOptions
    );
    const result = await response.json()
    console.log(result)
    return result
}
