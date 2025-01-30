import { IRegisterForm } from "../../interfaces/user";

interface IAvatarProps {
  userDetails: IRegisterForm
}

const Avatar = ({userDetails}: IAvatarProps) => {

  console.log(userDetails)
  return (
    <div className="avatar-container">
      <div className="avatar-image">
        <img
          src="https://plus.unsplash.com/premium_photo-1664536392779-049ba8fde933?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTN8fGF2YXRhcnxlbnwwfHwwfHx8MA%3D%3D"
          alt=""
        />
      </div>
      <div className="avatar-details">
        <div className="avatar-username">{userDetails.userName}</div>
        <div className="avatar-email">{userDetails.email}</div>
      </div>
    </div>
  );
};

export default Avatar;
