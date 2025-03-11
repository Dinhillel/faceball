// src/redux/scoresSlice.js
import { createSlice } from '@reduxjs/toolkit';

const scoresSlice = createSlice({
  name: 'scores',
  initialState: {
    scores: [],
  },
  reducers: {
    setScores: (state, action) => {
      state.scores = action.payload;
    },
  },
});

export const { setScores } = scoresSlice.actions;
export default scoresSlice.reducer;
