import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../components/userlist.css';

const UserList = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const { data } = await axios.get('http://localhost:4000/api/api/users');
        console.log(data); 
        setUsers(data.message); 
      } catch (error) {
        console.log(error);
      }
    };

    fetchUsers();
  }, []);


  if (!Array.isArray(users)) {
    console.log("users is not an array:", users);
    return <div>Loading or No Data Available</div>;
  }

  return (
    <div className="container">
      <h2 className='user-head'>User List</h2>
      <div className="table-container">
        <table className="table">
          <thead>
            <tr>
              <th>Username</th>
              <th>Email</th>
              <th>ID</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.email}>
                <td >{user.username}</td>
                <td>{user.email}</td>
                <td>{user.userID}</td>
              </tr>
            ))}
          </tbody>

        </table>
      </div>
    </div>
  );
};

export default UserList;
