// store.js
import { configureStore } from '@reduxjs/toolkit';
import userReducer from './UserSlice'; // import your user slice reducer

const store = configureStore({
  reducer: {
    user: userReducer,
  },
});

export default store;
