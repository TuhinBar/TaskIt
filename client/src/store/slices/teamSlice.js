import { createSlice } from "@reduxjs/toolkit";
import {
  createTeam,
  getAllTeams,
  createTask,
  getTaskDetails,
  updateTask,
} from "../features/teamAction";

const initialState = {
  singleTeam: null,
  tasks: [],
  singleTask: null,
  teams: [],
  loading: false,
  error: null,
  success: false,
  addTaskSuccess: false,
  viewTaskSuccess: false,
};

const teamSlice = createSlice({
  name: "team",
  initialState,
  reducers: {
    setTeam: (state, action) => {
      state.singleTeam = action.payload;
    },
    clearTeam: (state, action) => {
      state.teams = null;
    },
    setSingleTask: (state, action) => {
      console.log(action.payload);
      state.singleTask = action.payload;
    },
  },
  extraReducers(builder) {
    builder.addCase(createTeam.pending, (state, action) => {
      state.loading = true;
      state.error = null;
      state.success = false;
    });
    builder.addCase(createTeam.fulfilled, (state, action) => {
      state.loading = false;
      state.error = null;
      state.success = true;
      state.teams = action.payload.team;
      console.log("Create Team Success", action.payload);
    });
    builder.addCase(createTeam.rejected, (state, action) => {
      console.log("Create Team Failed", action.payload);
      state.loading = false;
      state.error = action.payload?.message;
      state.success = false;
    });
    builder.addCase(getAllTeams.pending, (state, action) => {
      state.loading = true;
      state.error = null;
      state.success = false;
    });
    builder.addCase(getAllTeams.fulfilled, (state, action) => {
      state.loading = false;
      state.error = null;
      console.log("Get All Teams Success", action.payload.teams);
      state.teams = action.payload.teams;
      state.singleTeam = action.payload.teams[0];
      console.log(state);
      console.log("Get All Teams Success", action.payload);
    });
    builder.addCase(getAllTeams.rejected, (state, action) => {
      console.log("Get All Teams Failed", action.payload);
      state.loading = false;
      state.error = action.payload?.message;
      state.success = false;
    });
    builder.addCase(createTask.pending, (state, action) => {
      state.loading = true;
      state.error = null;
      state.success = false;
    });
    builder.addCase(createTask.fulfilled, (state, action) => {
      state.loading = false;
      state.error = null;
      state.addTaskSuccess = true;
      console.log("Create Task Success", action.payload);
    });
    builder.addCase(createTask.rejected, (state, action) => {
      console.log("Create Task Failed", action.payload);
      state.loading = false;
      state.error = action.payload?.message;
      state.success = false;
    });
    builder.addCase(getTaskDetails.pending, (state, action) => {
      state.loading = true;
      state.error = null;
      state.success = false;
    });
    builder.addCase(getTaskDetails.fulfilled, (state, action) => {
      state.loading = false;
      state.error = null;
      state.viewTaskSuccess = true;
      state.singleTask = action.payload.task;
      console.log("Get Task Details Success", action.payload);
    });
    builder.addCase(getTaskDetails.rejected, (state, action) => {
      console.log("Get Task Details Failed", action.payload);
      state.loading = false;
      state.error = action.payload?.message;
      state.success = false;
    });
    builder.addCase(updateTask.pending, (state, action) => {
      state.loading = true;
      state.error = null;
      state.success = false;
    });
    builder.addCase(updateTask.fulfilled, (state, action) => {
      state.loading = false;
      state.error = null;
      state.success = true;
      state.singleTask = action.payload.updatedTask;
      console.log("Update Task Success", action.payload);
    });
    builder.addCase(updateTask.rejected, (state, action) => {
      console.log("Update Task Failed", action.payload);
      state.loading = false;
      state.error = action.payload?.message;
      state.success = false;
    });
  },
});

export const { setTeam, clearTeam, setSingleTask } = teamSlice.actions;
export const teamSelector = (state) => state.team;
export default teamSlice.reducer;
