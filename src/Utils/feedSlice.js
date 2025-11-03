import { createSlice } from '@reduxjs/toolkit';

export const feedSlice = createSlice({
  name: 'feed',
  initialState: null,
  reducers: {
    addFeed: (state,action) =>{
      return action.payload;
    }
  },
})

// Action creators are generated for each case reducer function
export const { addFeed } = feedSlice.actions;

export default feedSlice.reducer;