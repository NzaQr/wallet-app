import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import "./Form.css";

const Signup = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [failed, setFailed] = useState(false);

  const axios = require("axios");
  const history = useHistory();

  const register = async (e) => {
    e.preventDefault();
    axios
      .post("http://104.236.219.24:4000/auth", {
        userName: username,
        password: password,
      })
      .then((res) => {
        console.log(res.status);

        history.push("/login");
      })
      .catch((err) => {
        console.error(err.status);
        setFailed(true);
      });
  };

  return (
    <div>
      <form className="account-form" onSubmit={register}>
        <h1 className="account-title">Sign Up</h1>

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
        <button className="account-button" type="submit" onClick={register}>
          Register
        </button>
      </form>
      {failed ? <p>User Name already exist</p> : ""}
      <p className="account-helper">
        Already have an account? <Link to="/login">Log In</Link>
      </p>
    </div>
  );
};

export default Signup;
