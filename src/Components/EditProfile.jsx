import axios from 'axios';
import React, { useState } from 'react'
import { addUser } from '../Utils/userSlice';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import Card from './Card';


const EditProfile = ({user}) => {

  const [firstName, setFirstName] = useState(user?.firstName || "");
  const [lastName, setLastName] = useState(user?.lastName || "");
  const [age,setAge] = useState(user?.age || "");
  const [about, setAbout] = useState(user?.about || "");
  const [gender, setGender] = useState(user?.gender || "");
  const [photoUrl, setPhotoUrl] = useState(user.photoUrl ||"");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [showTost,setShowTost] = useState(false);

  const handleUpdateProfile = async () => {
    try {
      const res = await axios.patch("http://localhost:3000/profile/edit", {
        firstName,
        lastName,
        age,
        gender,
        photoUrl,
        about
      }, { withCredentials: true });
      const data = res.data.data;
      dispatch(addUser(data));
      setShowTost(true);
      setTimeout(()=>{
        setShowTost(false)
      },3000);
    } catch (error) {
      console.log("Error", error)
    }
  }

  return (
    <div className="flex justify-center align-center gap-10 flex-wrap">
      <div className="flex justify-center my-10">
        <div className="card bg-base-100 w-96 shadow-xl">
          <div className="card-body">
            <h2 className="card-title justify-center">Edit Profile</h2>
            <div >
              <fieldset className="fieldset my-2 w-full">
                <legend className="fieldset-legend">First Name</legend>
                <input type="text" className="input" value={firstName} onChange={(e) => { setFirstName(e.target.value) }} placeholder="Edit your first name" />
              </fieldset>
              <fieldset className="fieldset my-2 w-full">
                <legend className="fieldset-legend">Last Name</legend>
                <input type="text" className="input" value={lastName} onChange={(e) => { setLastName(e.target.value) }} placeholder="Edit your last name" />
              </fieldset>
              <fieldset className="fieldset my-2 w-full">
                <legend className="fieldset-legend">Age</legend>
                <input type="number" className="input" value={age} onChange={(e) => { setAge(e.target.value) }} placeholder="Edit your age" />
              </fieldset>
              <fieldset className="fieldset my-2 w-full">
                <legend className="fieldset-legend">Photo Url</legend>
                <input type="text" className="input" value={photoUrl} onChange={(e) => { setPhotoUrl(e.target.value) }} placeholder="Edit your photo" />
              </fieldset>
              <fieldset className="fieldset my-2 w-full">
                <legend className="fieldset-legend">About</legend>
                <input type="text" className="input" value={about} onChange={(e) => { setAbout(e.target.value) }} placeholder="Edit" />
              </fieldset>
              <fieldset className="fieldset my-2 w-full">
                <legend className="fieldset-legend">Gender</legend>
                <input type="text" className="input" value={gender} onChange={(e) => { setGender(e.target.value) }} placeholder="Edit your gender" />
              </fieldset>
            </div>
            <div className="card-actions justify-center mt-4">
              <button className="btn btn-primary" onClick={handleUpdateProfile}>Update</button>
            </div>
          </div>
        </div>
      </div>
      <div className="height-auto my-10">
        <Card user={{firstName, lastName, age, gender, photoUrl, about}} mode={"edit"}/>
      </div>
      {showTost &&
        <div className="toast toast-top toast-end">
          <div className="alert alert-success">
            <span>Profile updated successfully.</span>
          </div>
        </div>
      }
      
    </div>
    
  )
}

export default EditProfile