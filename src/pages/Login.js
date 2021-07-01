import React, { useContext, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { TokenContext } from "../context/TokenContext";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [failed, setFailed] = useState(false);
  const axios = require("axios");
  const history = useHistory();
  const { setToken } = useContext(TokenContext);

  const login = async (e) => {
    e.preventDefault();
    axios
      .post("http://104.236.219.24:4000/auth/login", {
        userName: username,
        password: password,
      })
      .then((res) => {
        const data = res.data.token;
        setToken(data);
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
      {failed ? <p>User Name already exists</p> : ""}
      <p>
        <Link to="/">Register</Link>
      </p>
    </div>
  );
};

export default Login;
