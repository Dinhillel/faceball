import { createSlice } from '@reduxjs/toolkit';

const videoSlice = createSlice({
  name: 'videos',
  initialState: {
    list: [],
  },
  reducers: {
    setVideos: (state, action) => {
      state.list = action.payload;
    },
  },
});

export const { setVideos } = videoSlice.actions;
export default videoSlice.reducer;
