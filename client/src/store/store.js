import { configureStore } from "@reduxjs/toolkit";

import userReducer from "./slices/userSlice";
import teamReducer from "./slices/teamSlice";

const store = configureStore({
  reducer: {
    user: userReducer,
    team: teamReducer,
  },
});

export const userSelector = (state) => state.user;
export default store;
