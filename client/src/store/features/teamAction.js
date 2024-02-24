import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../Utils/axios";

export const createTeam = createAsyncThunk(
  "team/create",
  async (data, { rejectWithValue }) => {
    try {
      const response = await axios.post("/teams/create", data);
      return response.data;
    } catch (error) {
      console.log("Create Team Failed", error.response.data);
      return rejectWithValue(error.response.data);
    }
  }
);
