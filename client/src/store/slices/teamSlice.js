import { createSlice } from "@reduxjs/toolkit";
import { createTeam, getAllTeams } from "../features/teamAction";

const initialState = {
  singleTeam: null,
  teams: [],
  loading: false,
  error: null,
  success: false,
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
      state.team = action.payload.team;
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
  },
});

export const { setTeam, clearTeam } = teamSlice.actions;
export const teamSelector = (state) => state.team;
export default teamSlice.reducer;
