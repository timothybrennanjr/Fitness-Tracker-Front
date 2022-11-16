import React from "react";
import { NavLink } from "react-router-dom";
import { loginUser, registerUser } from "../api-adapter";

const NavBar = (props) => {
  const setLoggedIn = props.setLoggedIn;

  async function logout() {
    localStorage.removeItem("token");
    localStorage.removeItem("username");
    setLoggedIn(false);
  }

    async function handleLogin(event) {
      event.preventDefault();
      const username = event.target[0].value;
      const password = event.target[1].value;
      const { token } = await loginUser(username, password);
      console.log(token);
      localStorage.setItem("token", token);
      if (token) {
        localStorage.setItem("token", token);
        localStorage.setItem("username", username);
        setLoggedIn(token.token);
        event.target[0].value = "";
        event.target[1].value = "";
      } else {
        setLoggedIn(false);
        event.target[0].value = "";
        event.target[1].value = "";
        return alert(
          "Username not found or username and password do not match. Please check your credentials or register a new account."
        );
      }
    }

      async function handleRegister(event) {
        event.preventDefault();
        const username = event.target[0].value;
        const password = event.target[1].value;
        const token = await registerUser(username, password);
        localStorage.removeItem("token");
        localStorage.setItem("token", token);
        if (password) {
          const response = await registerUser(username, password);
          localStorage.removeItem("token");
          localStorage.removeItem("username");
          if (response.token) {
            localStorage.setItem("token", response.token);
            localStorage.setItem("username", username);
            event.target[0].value = "";
            event.target[1].value = "";
          } else {
            alert("Account is already registered. Please log in.");
            event.target[0].value = "";
            event.target[1].value = "";
          }
        } else {
          alert("Passwords do not match!");
          event.target[0].value = "";
          event.target[1].value = "";
        }
      }

      return (
        <div id="navbar">
          <h1>Fitness Tracker</h1>
          {!localStorage.token ? (
            <>
              <div className="registerBox">
                <h1 className="registerHeader">
                  {" "}
                  Register
                  <form onSubmit={handleRegister} className="registerForm">
                    <input
                      id="registerUsername"
                      type="text"
                      placeholder="Username *"
                      required
                    />
                    <input
                      id="registerPassword"
                      type="text"
                      placeholder="Password *"
                      required
                    />
                    <button type="submit" id="registerButton">
                      Register Here
                    </button>
                  </form>
                </h1>
              </div>
              <div className="loginBox">
                <h1 className="loginHeader">
                  {" "}
                  Login
                  <form onSubmit={handleLogin} className="loginForm">
                    <input
                      id="loginUsername"
                      type="text"
                      placeholder="Username *"
                      required
                    />
                    <input
                      id="loginPassword"
                      type="text"
                      placeholder="Password *"
                      required
                    />
                    <button type="submit" id="loginButton">
                      login Here
                    </button>
                  </form>
                </h1>
              </div>
            </>
          ) : (
            <>
              <div id="navLinkButtons">
                <NavLink to="/activities">
                  <button>activities</button>
                </NavLink>
                <NavLink to="/myroutines">
                  <button>My Routines</button>
                </NavLink>
                <NavLink to="/routines">
                  <button>Routines</button>
                </NavLink>
                <NavLink to="/">
                  <button>Home</button>
                </NavLink>
                <button id="logoutButton" onClick={logout}>
                  logout
                </button>
              </div>
            </>
          )}
        </div>
      );
    
};
export default NavBar;
