import { createSlice } from "@reduxjs/toolkit";
import { login } from "../features/userActions";
import { fetchOwnerLocal } from "../../Utils/fetchUser";

const initialState = {
  user: fetchOwnerLocal(),
  loading: false,
  error: null,
  success: false,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
      localStorage.setItem("user", JSON.stringify(action.payload));
    },
  },
  extraReducers(builder) {
    builder.addCase(login.pending, (state, action) => {
      state.loading = true;
      state.error = null;
      state.success = false;
    });
    builder.addCase(login.fulfilled, (state, action) => {
      state.loading = false;
      state.error = null;
      state.success = true;
      state.user = action.payload.user;
      console.log("Login Success", action.payload);
      localStorage.setItem("user", JSON.stringify(action.payload.user));
    });
    builder.addCase(login.rejected, (state, action) => {
      console.log("Login Failed", action.payload);
      state.loading = false;
      state.error = action.payload?.message;
      state.success = false;
    });
  },
});

export const { setUser } = userSlice.actions;
export default userSlice.reducer;
