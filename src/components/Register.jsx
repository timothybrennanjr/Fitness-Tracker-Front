import React from "react";
import { registerUser } from "../api-adapter";

const Register = (props) => {
    
    async function handleRegister (event) {
        event.preventDefault()
        const username = event.target[0].value
        const password = event.target[1].value
        const token = await registerUser(username, password)
        localStorage.removeItem("token")
        localStorage.setItem("token", token)
        if (password) {
            const response = await registerUser(username, password);
            localStorage.removeItem("token");
            localStorage.removeItem("username");
            if (response.token) {
              localStorage.setItem("token", response.token);
              localStorage.setItem("username", username);
              event.target[0].value = ''
              event.target[1].value = ''
            } else {
              alert("Account is already registered. Please log in.")
              event.target[0].value = ''
              event.target[1].value = ''
            }
          } else {
            alert("Passwords do not match!")
            event.target[0].value = ''
            event.target[1].value = ''
          }
        }
    

    return (
        <div className="registerBox">
            <h1 className="registerHeader"> Register
            <form onSubmit={handleRegister} className="registerForm">
                <input id="registerUsername" type="text" placeholder="Username *" required />
                <input id="registerPassword" type="text" placeholder="Password *" required />
                <button type="submit" id="registerButton">Register Here</button>
            </form>
            </h1>
        </div>
    )
}

export default Register