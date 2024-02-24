import { createSlice } from "@reduxjs/toolkit";
import { createTeam } from "../features/teamAction";

const initialState = {
  team: null,
  loading: false,
  error: null,
  success: false,
};

const teamSlice = createSlice({
  name: "team",
  initialState,
  reducers: {
    setTeam: (state, action) => {
      state.team = action.payload;
    },
    clearTeam: (state, action) => {
      state.team = null;
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
  },
});

export const { setTeam, clearTeam } = teamSlice.actions;
export default teamSlice.reducer;
