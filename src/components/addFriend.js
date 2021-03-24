import React, { useState } from "react";
import axios from "axios";
import { axiosWithAuth } from "./utils/axiosWithAuth";
export default function AddFriend(props) {
  const friendSchema = {
    id: Date.now(),
    name: "",
    age: 0,
    email: "",
  };
  const [addFriendValue, setAddFriendValue] = useState(friendSchema);

  const handleChanges = (e) => {
    setAddFriendValue({
      ...addFriendValue,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const readyToGoData = {
      ...addFriendValue,
      id: parseInt(addFriendValue.id),
      age: parseInt(addFriendValue.age),
    };
    console.log(addFriendValue);
    axiosWithAuth()
      .post("http://localhost:5000/api/friends", readyToGoData)
      .then((res) => {
        axiosWithAuth()
          .get("http://localhost:5000/api/friends")
          .then((res) => {
            console.log(res);
            props.setFriends({ friends: res.data });
          });
      })
      .catch((err) => {
        console.log(err.response);
      });
  };

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="name">Name: </label>
      <input
        value={addFriendValue.name}
        name="name"
        type="text"
        onChange={handleChanges}
      />
      <label htmlFor="age">Age: </label>
      <input
        value={addFriendValue.age}
        name="age"
        type="number"
        onChange={handleChanges}
      />
      <label htmlFor="email">Email: </label>
      <input
        value={addFriendValue.email}
        name="email"
        type="email"
        onChange={handleChanges}
      />
      <button>Submit</button>
    </form>
  );
}
