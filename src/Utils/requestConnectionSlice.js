import { createSlice } from '@reduxjs/toolkit';

export const requestConnectionSlice = createSlice({
  name: 'connection',
  initialState: null,
  reducers: {
    addRequests: (state, action) => action.payload,
    removeRequests: (state, action) => {
      const updatedRequests = state.filter((r)=> r._id !== action.payload);
      return updatedRequests;
    }
  },
})

// Action creators are generated for each case reducer function
export const { addRequests, removeRequests } = requestConnectionSlice.actions;

export default requestConnectionSlice.reducer;