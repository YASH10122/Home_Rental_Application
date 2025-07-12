/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import "../styles/Login.scss"
import { setLogin } from "../redux/state";
import { useDispatch } from "react-redux"
import { useNavigate } from "react-router-dom"

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch()

  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      const response = await fetch("http://localhost:4546/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          withCredentials: true
        },
        body: JSON.stringify({ email, password })
      })
      console.log(response.data);

      /* Get data after fetching */
      const loggedIn = await response.json()
      localStorage.setItem('id', loggedIn.user._id)
      // console.log(loggedIn.user._id) ;
      // console.log(use);


      if (loggedIn) {
        dispatch(
          setLogin({
            user: loggedIn.user,
            token: loggedIn.token
          })
        )
        console.log(loggedIn.user);
        if (loggedIn.user.role === "admin") {
          navigate("/admin")
        }
        else {
          navigate("/")
        }

      }

    } catch (err) {
      console.log("Login failed", err.message)
    }
  }

  return (
    <div className="login">
      <div className="login_content">
        <form className="login_content_form" onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          {/* <label for="option1">Admin</label>
          <input type="radio" name="role" value="admin" id="option1" />
          <label for="option2">User</label>
          <input type="radio" name="role" value="user" id="option2" /> */}

          <button type="submit">LOG IN</button>
        </form>
        <a href="/register">Don have an account? Sign In Here</a>
      </div>
    </div>
  );
};

export default LoginPage;