import React from "react";
import { loginUser } from "../api-adapter";

const Login = (props) => {
    async function handleLogin (event) {
        event.preventDefault()
        const username = event.target[0].value
        const password = event.target[1].value
        const {token} = await loginUser(username, password)
        console.log(token)
        localStorage.setItem("token", token)
    }

    return (
        <div className="loginBox">
            <h1 className="loginHeader"> Login
            <form onSubmit={handleLogin} className="loginForm">
                <input id="loginUsername" type="text" placeholder="Username *" required />
                <input id="loginPassword" type="text" placeholder="Password *" required />
                <button type="submit" id="loginButton">login Here</button>
            </form>
            </h1>
        </div>
    )
}

export default Login