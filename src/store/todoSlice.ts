import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { generateId } from '../helper';

interface ITask {
  id: string,
  text: string,
  createdAt: number,
  completed: boolean,
}

interface IState {
  tasks: ITask[],
  filter: string
}


interface IUpdateTask {
  payload: {
    id: string,
    text: string,
  }
}

const initialState: IState = {
  tasks: localStorage.getItem('todos') ? JSON.parse(localStorage.getItem('todos') as string) : [],
  filter: 'all',
}

const todoSlice = createSlice({
  name: 'todos',
  initialState,
  reducers: {
    addTask(state, action: PayloadAction<string>) {
      const newTask = {
        id: generateId(),
        text: action.payload,
        createdAt: Date.now(),
        completed: false,
      };
      state.tasks = [newTask, ...state.tasks];
    },
    toggleDone(state, action: PayloadAction<string>) {
      console.log(action);
      
      const index = state.tasks.findIndex((task) => task.id === action.payload);
      state.tasks[index].completed = !state.tasks[index].completed;
    },
    updateTaks(state, action: IUpdateTask) {
      const index = state.tasks.findIndex((task) => task.id === action.payload.id)
      state.tasks[index].text = action.payload.text;
    },
    deleteTask(state, action: PayloadAction<string>) {
      state.tasks = state.tasks.filter((item) => item.id !== action.payload);
    },
    toggleFilter(state, action: PayloadAction<string>) {
      state.filter = action.payload;
    }
  }
});

export const { addTask, toggleDone, updateTaks, deleteTask, toggleFilter } = todoSlice.actions;
export default todoSlice.reducer;
