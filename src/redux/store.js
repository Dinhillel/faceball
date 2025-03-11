import { configureStore } from '@reduxjs/toolkit';
import scoresReducer from './scoresSlice';

export const store = configureStore({
  reducer: {
    scores: scoresReducer,
  },
});


export default store; 