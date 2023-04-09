import { Middleware } from '@reduxjs/toolkit';

const saveTodos: Middleware = (store) => (next) => (action) => {
  const result = next(action);
  const tasks = store.getState();
  
  localStorage.setItem('todos', JSON.stringify(tasks.todos.tasks));
  return result;
};

export default saveTodos;