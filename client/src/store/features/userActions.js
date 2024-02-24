import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../Utils/axios";

export const login = createAsyncThunk(
  "user/login",
  async (data, { rejectWithValue }) => {
    try {
      const response = await axios.post("/users/login", data);
      return response.data;
    } catch (error) {
      console.log("Login Failed", error.response.data);
      return rejectWithValue(error.response.data);
    }
  }
);
