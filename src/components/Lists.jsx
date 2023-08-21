import React from "react";
import axios from "axios";
import { useEffect, useState } from "react";
import { BrowserRouter as Router, Link } from "react-router-dom";

function Lists() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    getUsers();
  }, []);

  function getUsers() {
    axios.get("http://localhost:8888/api/user/").then(function (response) {
      console.log(response.data);
      setUsers(response.data);
    });
  }

  const deleteUser = (id) => {
    axios
      .delete(`http://localhost:8888/api/user/${id}/delete`)
      .then(function (response) {
        console.log(response.data);
        getUsers();
      });
  };

  console.log(users);

  return (

   
      <tbody>
           <h1>List users</h1>
        {users.map((user, key) => (
          <tr key={key}>
            <td>{user.name}</td>
            <td>{user.email}</td>
            <td>{user.mobile}</td>

            <td>
              <Link to={`user/${user.id}/edit`} style={{ marginRight: "10px" }}>
                {" "}
                Edit
              </Link>
              <button onClick={() => deleteUser(user.id)}>Delete</button>
            </td>
          </tr>
        ))}
      </tbody>

  );
}
export default Lists;