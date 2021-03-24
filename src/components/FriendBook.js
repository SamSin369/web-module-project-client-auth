import React, { useState, useEffect } from "react";
import { Route, Redirect } from "react-router-dom";
import { axiosWithAuth } from "./utils/axiosWithAuth";
import axios from "axios";
import AddFriend from "./addFriend";
export default function FriendBook() {
  const friendSchema = {
    friends: [],
  };
  const [friends, setFriends] = useState(friendSchema);

  useEffect(() => {
    getData();
  }, []);

  const getData = () => {
    axiosWithAuth()
      .get("http://localhost:5000/api/friends")
      .then((res) => {
        console.log(res);
        setFriends({ friends: res.data });
      })
      .catch((err) => {
        console.log("err: ", err.response);
      });
  };

  const handleClick = (id) => {
    console.log(friends.friends);
    const filteredList = friends.friends.filter((friend) => {
      return friend.id !== id;
    });
    setFriends({ friends: filteredList });
  };
  console.log(friends);

  return (
    <>
      <AddFriend setFriends={setFriends} />

      {friends.friends.map((friend) => {
        return (
          <div className="friendItem">
            <h1>{friend.name}</h1>
            <h2>{friend.age}</h2>
            <h3>{friend.email}</h3>
            <button onClick={() => handleClick(friend.id)}>
              Remove Friend
            </button>
          </div>
        );
      })}
    </>
  );
}
