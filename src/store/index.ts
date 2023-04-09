import { configureStore } from "@reduxjs/toolkit";
import saveTodos from "./saveTasksMiddleware";

import todoSlice from './todoSlice';

const store = configureStore({
  reducer: {
    todos: todoSlice,
  },
  middleware: [saveTodos],
});

export default store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
