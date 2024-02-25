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

export const inviteMember = createAsyncThunk(
  "team/invite",
  async (data, { rejectWithValue }) => {
    try {
      const response = await axios.post("/teams/invite", data);
      return response.data;
    } catch (error) {
      console.log("Invite Member Failed", error.response.data);
      return rejectWithValue(error.response.data);
    }
  }
);

export const createTask = createAsyncThunk(
  "task/create",
  async (data, { rejectWithValue }) => {
    try {
      const response = await axios.post("/teams/create-task", data);
      return response.data;
    } catch (error) {
      console.log("Create Task Failed", error.response.data);
      return rejectWithValue(error.response.data);
    }
  }
);

export const getTaskDetails = createAsyncThunk(
  "task/getAll",
  async (data, { rejectWithValue }) => {
    console.log(data);
    try {
      const response = await axios.get(`/teams/task?taskId=${data.taskId}`);
      return response.data;
    } catch (error) {
      console.log("Get All Tasks Failed", error.response.data);
      return rejectWithValue(error.response.data);
    }
  }
);

export const updateTask = createAsyncThunk(
  "task/update",
  async (data, { rejectWithValue }) => {
    try {
      const response = await axios.put("/teams/update-task", data);
      return response.data;
    } catch (error) {
      console.log("Update Task Failed", error.response.data);
      return rejectWithValue(error.response.data);
    }
  }
);
