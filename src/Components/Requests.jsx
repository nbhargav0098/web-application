import axios from 'axios';
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { addRequests, removeRequests } from '../Utils/requestConnectionSlice';

const Requests = () => {
  const requests = useSelector((store) => store.requests)
  const dispatch = useDispatch();

  const fetchRequests = async () => {
    try {
      const res = await axios.get("http://localhost:3000/user/requests/received", { withCredentials: true });
      dispatch(addRequests(res.data.data));
    } catch (error) {
      console.log("error", error)
    }
  }

  useEffect(() => {
    fetchRequests();
  }, []);

  const handleRequestAction = async (requestStatus,requestId) => {
    try {
      const res = await axios.post(`http://localhost:3000/request/review/${requestStatus}/${requestId}`,{},{ withCredentials: true });
      dispatch(removeRequests(res.data.data._id));
    } catch (error) {
      console.log("error", error)
    }
  }

  if (!requests) return;

  return (
    <div className="flex flex-col items-center my-10 w-full">
      <h1 className="font-bold text-3xl mb-6 text-center">Connection Requests</h1>

      <div className="w-full max-w-2xl">
        {requests.length === 0 ? (
          <p className="text-center text-base-content/60">No requests yet.</p>
        ) : (
          <ul className="flex flex-col gap-6">
            {requests.map((userRequest, index) => {
              const { firstName, lastName, gender, age, about, photoUrl, _id } =
                userRequest.fromUserId;

              return (
                <li
                  key={index}
                  className="flex flex-col bg-base-100 rounded-xl shadow-md hover:shadow-lg transition-all duration-200 p-4"
                >
                  {/* Top part: photo + info in a row */}
                  <div className="flex items-center gap-4">
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
                  </div>

                  <div className="flex justify-end gap-4 mt-4">
                    <button
                      className="btn btn-primary btn-sm px-5"
                      onClick={() => handleRequestAction("accepted", userRequest._id)}
                    >
                      Accept
                    </button>
                    <button
                      className="btn btn-secondary btn-sm px-5"
                      onClick={() => handleRequestAction("rejected", userRequest._id)}
                    >
                      Reject
                    </button>
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

export default Requests