import { createSlice } from "@reduxjs/toolkit";

const initialState = [];

export const taskSlice = createSlice({
  name: "task",
  initialState,
  reducers: {
    addTask: (state, action) => {
      //console.log(state, action);
      state.push(action.payload);
    },
    deleteTask: (state, action) => {
      const taskFound = state.find( task => task.id === action.payload);
      //console.log(taskFound);
      if(taskFound){
        const index = state.indexOf(taskFound);
        state.splice(index, 1);
      }
    },
    updateTask: (state, action) => {
      const { id, title, description } = action.payload;
      const task = state.find((task) => task.id === id);
      if (task) {
        task.title = title;
        task.description = description;
      }
    },
  },
});

export const { addTask, deleteTask, updateTask } =
  taskSlice.actions;
export default taskSlice.reducer;
