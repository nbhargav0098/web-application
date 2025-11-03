import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { addFeed } from '../Utils/feedSlice';
import Card from './Card';

function Feed() {
  const dispatch = useDispatch();
  const [userFeed, setUserFeed] = useState();

  const getFeed = async () => {
    if (userFeed) return;
    try {
      const res = await axios.get("http://localhost:3000/feed", { withCredentials: true });
      console.log("res",res)
      dispatch(addFeed(res.data.data));
      setUserFeed(res.data.data);
    } catch (error) {
      console.log("Error", error)
    }
  }

  useEffect(() => {
    getFeed();
  }, []);

  return (
    <>
      {userFeed && userFeed.length === 0 && 
        <div className="flex justify-center my-10">
          <h1>Your feed is empty</h1>
        </div>
      }
      {userFeed && userFeed.length > 0 && 
        <div className="flex justify-center my-10">
          <Card user={userFeed[0]} mode={"feed"}/>
        </div>
      }
    </>

  )
}

export default Feed