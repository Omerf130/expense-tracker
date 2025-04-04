import { ChangeEvent, useEffect, useState } from "react";
import "./Admin.scss";
import { deleteUserById, getAllUsers, updatedUserRoleById } from "../../services/api/user";
import { IUser, TRole } from "../../interfaces/user";
import { RiDeleteBin6Line } from "react-icons/ri";

const Admin = () => {
  const [users, setUsers] = useState<IUser[] | null>(null);
  const [userWidth, setUserWidth] = useState(0);

  useEffect(() => {
    fetchUsers();
    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, []);

  const fetchUsers = async () => {
    try {
      const data = await getAllUsers();
      data?.list && setUsers(data.list);
    } catch (error) {
      console.log(error);
    }
  };

  const handleDelete = async (id: string) => {
    const isConfirmed = window.confirm(
      "Are you sure you want to delete this expense?"
    );
    if (isConfirmed) {
      const data = await deleteUserById(id);
      data?.list && setUsers(data?.list);
    }
  };

  const onDropdownChange = (e:ChangeEvent<HTMLSelectElement>, id:string) => {
    updatedUserRoleById(e.target.value as TRole , id)
  }

  const handleResize = () => {
    setUserWidth(window.innerWidth)
  }

  return (
    <div className={`admin-container ${userWidth <= 800 ? "mobile-view" : ""}`}>
      <div className="admin-header">Users</div>
      <div className="admin-users-list">
        <div className="list-item">
          <div className="title user-email">Email</div>
          <div className="title user-username">User Name</div>
          <div className="title user-date">Creation Date</div>
          <div className="title user-firstname">Name</div>
          <div className="title user-lastname">Last Name</div>
          <div className="title user-role">role</div>
          <div className="title user-delete"></div>
        </div>
        {users?.map((user) => (
          <div className="list-item" key={user._id}>
            <div className="user-email">{user.email}</div>
            <div className="user-username">{user.userName}</div>
            <div className="user-date">
              {new Date(user.createdAt).toLocaleDateString()}
            </div>
            <div className="user-firstname">{user.firstName}</div>
            <div className="user-lastname">{user.lastName}</div>
            <div className="user-role">
              <select name="" defaultValue={user.role} onChange={ (e) => onDropdownChange(e,user._id)}>
                <option value="admin">Admin</option>
                <option value="pro">Pro</option>
                <option value="basic">Basic</option>
              </select>
            </div>
            <div className="user-delete" onClick={ () => handleDelete(user._id)}><RiDeleteBin6Line className="btn-delete" size={32}/></div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Admin;
