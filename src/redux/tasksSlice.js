import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  tasks: [],
  tags: [],
};

const tasksSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {
    getTags: (state, { payload }) => {
      state.tags = [...state.tags, payload];
    },
    getTasks: (state, { payload }) => {
      state.tasks = state.tasks.concat(payload);
    },
  },
});

export const { getTags, getTasks } = tasksSlice.actions;
export default tasksSlice.reducer;
