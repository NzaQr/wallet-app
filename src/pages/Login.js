import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import "./Form.css";
const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [failed, setFailed] = useState(false);
  const axios = require("axios");
  const history = useHistory();

  const login = async (e) => {
    e.preventDefault();
    axios
      .post("http://104.236.219.24:4000/auth/login", {
        userName: username,
        password: password,
      })
      .then((res) => {
        const data = res.data.token;

        localStorage.setItem("token", data);
        history.push("/dashboard");
      })
      .catch((err) => {
        console.error(err);
        setFailed(true);
      });
  };

  return (
    <div>
      <form className="account-form" onSubmit={login}>
        <h1 className="account-title">Login</h1>
        <input
          className="account-input"
          type="text"
          placeholder="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          className="account-input"
          type="password"
          placeholder="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button className="account-button" type="submit" onClick={login}>
          Login
        </button>
      </form>
      {failed ? <p>Something went wrong</p> : ""}
      <p className="account-helper">
        Need an account? <Link to="/">Register</Link>
      </p>
    </div>
  );
};

export default Login;
