import React, { useEffect, useState } from "react";
import "./Admin.scss";
import { getAllUsers } from "../../services/api/user";
import { IUser } from "../../interfaces/user";

const Admin = () => {
  const [users, setUsers] = useState<IUser[] | null>(null);
  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const data = await getAllUsers();
      data?.list && setUsers(data.list);
    } catch (error) {
      console.log(error);
    }
  };

  console.log(users);

  return (
    <div className="admin-container">
      <div className="admin-header">Users</div>
      <div className="admin-users-list">
        <div className="list-item">
          <div className="title user-email">Email</div>
          <div className="title user-username">User Name</div>
          <div className="title user-date">Creation Date</div>
          <div className="title user-firstname">Name</div>
          <div className="title user-lastname">Last Name</div>
        </div>
        {users?.map((user) => (
          <div className="list-item">
            <div className="user-email">{user.email}</div>
            <div className="user-username">{user.userName}</div>
            <div className="user-date">
              {new Date(user.createdAt).toLocaleDateString()}
            </div>
            <div className="user-firstname">{user.firstName}</div>
            <div className="user-lastname">{user.lastName}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Admin;
