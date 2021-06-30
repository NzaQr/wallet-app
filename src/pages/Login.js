import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";

const Login = () => {
  const [username, setUsername] = useState();
  const [password, setPassword] = useState();
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
        console.log(res.data.token);

        history.push("/dashboard");
      })
      .catch((err) => {
        console.error(err);
        setFailed(true);
      });
  };

  return (
    <div>
      <form onSubmit={login}>
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
        <button type="submit" onClick={login}>
          Login
        </button>
      </form>
      {failed ? <p>User Name already exist</p> : ""}
      <p>
        <Link to="/">Register</Link>
      </p>
    </div>
  );
};

export default Login;
