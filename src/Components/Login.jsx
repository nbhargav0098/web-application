import axios from 'axios';
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { addUser } from '../Utils/userSlice';
import { useNavigate } from 'react-router-dom';

function Login() {
  const [emailId,setEmailId] = useState("");
  const [password,setPassword] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleLogin = async () => {
    try {
      const res = await axios.post("http://localhost:3000/login", {
        emailId,
        password
      },{withCredentials: true});
      const data = res.data.user; 
      dispatch(addUser(data));
      navigate("/");
    } catch (error) {
      console.log("Error",error)
    }
  }

  return (
    <div className="flex justify-center my-10">
      <div className="card bg-base-100 w-96 shadow-sm">
        <div className="card-body">
          <h2 className="card-title justify-center">Login</h2>
          <div >
            <fieldset className="fieldset my-2">
              <legend className="fieldset-legend">Emial Id</legend>
              <input type="text" className="input" value={emailId} onChange={(e)=>{setEmailId(e.target.value)}} placeholder="Enter your email" />
            </fieldset>
            <fieldset className="fieldset my-2">
              <legend className="fieldset-legend">Password</legend>
              <input type="password" className="input" vlaue={password} onChange={(e)=>{setPassword(e.target.value)}} placeholder="Enter your password" />
            </fieldset>
          </div>
          <div className="card-actions justify-center mt-4">
            <button className="btn btn-primary" onClick={handleLogin}>Login</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login;