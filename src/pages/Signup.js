import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";

const Signup = () => {
  const [username, setUsername] = useState();
  const [password, setPassword] = useState();
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
      <form onSubmit={register}>
        <input
          type="text"
          placeholder="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="text"
          placeholder="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit" onClick={register}>
          Register
        </button>
      </form>
      {failed ? <p>User Name already exist</p> : ""}
      <p>
        Already have an account? <Link to="/login">Log In</Link>
      </p>
    </div>
  );
};

export default Signup;
