import axios from "axios";
import React, { useState } from "react";
import FriendBook from "./FriendBook";

export default function LoginForm(props) {
  const formSchema = {
    credentials: {
      username: "",
      password: "",
    },
  };
  const [login, setLogin] = useState(formSchema);
  const handleChange = (e) => {
    console.log([login.credentials]);
    setLogin({
      credentials: {
        ...login.credentials,
        [e.target.name]: e.target.value,
      },
    });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(login.credentials);
    axios
      .post("http://localhost:5000/api/login", login.credentials)
      .then((res) => {
        console.log(res);
        localStorage.setItem("token", res.data.payload);
        props.history.push("/protected");
      })
      .catch((err) => {
        console.log(err.response);
      });
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label htmlFor="username">Username: </label>
        <input
          name="username"
          type="text"
          value={login.credentials.username}
          onChange={handleChange}
          placeholder="enter username"
        />
        <label htmlFor="password">Password: </label>
        <input
          name="password"
          type="password"
          value={login.credentials.password}
          onChange={handleChange}
          placeholder="enter password"
        />
        <button>Submit Form</button>
      </form>
    </div>
  );
}
