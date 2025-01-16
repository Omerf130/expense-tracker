import React,{useState} from 'react'
import "./Register.scss";
import { IRegisterForm } from '../../interfaces/user';
import { registerUser } from '../../services/api/user';

const Register = () => {
  const initialState = {userName:"",email:"",password:"", firstName:"", lastName:"",image:""};

  const [registerForm,setRegisterForm] = useState<IRegisterForm>(initialState);

  console.log(registerForm)

  const resetForm = () => setRegisterForm(initialState);

  const handleSubmit = async (e:React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await registerUser(registerForm);
    resetForm();
  }


  return (
    <div className="page">
      <form className="cover" onSubmit={handleSubmit}>
        <h1>Sign Up</h1>
        <input type="text" placeholder="firstName" onChange={(e) => setRegisterForm({...registerForm, firstName: e.target.value})} value={registerForm.firstName} required/>
        <input type="text" placeholder="lastName" onChange={(e) => setRegisterForm({...registerForm, lastName: e.target.value})} value={registerForm.lastName} required/>
        <input type="text" placeholder="image" onChange={(e) => setRegisterForm({...registerForm, image: e.target.value})} value={registerForm.image} required/>
        <input type="text" placeholder="userName" onChange={(e) => setRegisterForm({...registerForm, userName: e.target.value})} value={registerForm.userName} required/>
        <input type="text" placeholder="E-Mail"  onChange={(e) => setRegisterForm({...registerForm, email: e.target.value})} value={registerForm.email} required/>
        <input type="password" placeholder="password"  onChange={(e) => setRegisterForm({...registerForm, password: e.target.value})} value={registerForm.password} required/>
        <button type='submit' className="signup-btn">Sign Up</button>

        <p className="text">Or Sign Up Using</p>
        
        <div className="alt-signup">
          <div className="facebook"></div>
          <div className="google"></div>
        </div>
      </form>
    </div>
  );
};

export default Register