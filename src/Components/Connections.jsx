import axios from 'axios';
import React, { useEffect } from 'react'
import { addConnections } from '../Utils/connectionSlice';
import { useDispatch, useSelector } from 'react-redux';


const Connections = () => {
  const connections = useSelector((store)=> store.connections)
  const dispatch = useDispatch();

  const fetchConnections = async() => {
    try {
      const res = await axios.get("http://localhost:3000/user/connections",{withCredentials: true});
      dispatch(addConnections(res.data.data));
    } catch (error) {
      console.log("error",error)
    }
  }

  useEffect(()=>{
    fetchConnections();
  },[]);

  if(!connections) return;

  return (
    <div className="flex flex-col items-center my-10 w-full">
      <h1 className="font-bold text-3xl mb-6 text-center">Your Connections</h1>

      <div className="w-full max-w-2xl">
        {connections.length === 0 ? (
          <p className="text-center text-base-content/60">No connections yet.</p>
        ) : (
          <ul className="flex flex-col gap-4">
            {connections.map((user, index) => {
              const { firstName, lastName, gender, age, about, photoUrl } = user;
              return (
                <li
                  key={index}
                  className="flex items-center gap-4 p-4 bg-base-100 rounded-xl shadow-md hover:shadow-lg hover:scale-[1.02] transition-all duration-200"
                >
                  <img
                    className="w-14 h-14 rounded-full object-cover border border-base-300"
                    src={photoUrl}
                    alt={`${firstName} ${lastName}`}
                  />
                  <div className="flex flex-col">
                    <span className="font-semibold text-base-content">
                      {`${firstName} ${lastName}, ${age}, ${gender}`}
                    </span>
                    <span className="text-sm text-base-content/60">{about}</span>
                  </div>
                </li>
              );
            })}
          </ul>
        )}
      </div>
    </div>

  )
}

export default Connections