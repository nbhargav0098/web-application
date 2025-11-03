import { configureStore } from '@reduxjs/toolkit';
import userReducer from "./userSlice";
import feedReducer from "./feedSlice";
import userConnections from "./connectionSlice";
import requestConnections from "./requestConnectionSlice.js";

export const store = configureStore({
  reducer: {
    user: userReducer,
    feed: feedReducer,
    connections: userConnections,
    requests: requestConnections,
  },
})

