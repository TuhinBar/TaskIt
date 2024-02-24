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

export const getAllTeams = createAsyncThunk(
  "team/getAll",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get("/teams/all-teams");
      return response.data;
    } catch (error) {
      console.log("Get All Teams Failed", error.response.data);
      return rejectWithValue(error.response.data);
    }
  }
);
