import { FC } from "react";

import { Header } from "../Header";
import { Task } from "../Task";
import { Footer } from "../footer";

import styles from './index.module.scss'
import { useAppSelector } from "../../hooks";

export const App: FC = () => {
  const {tasks, filter} = useAppSelector((state) => state.todos);
  
  const setVisibleTasks = () => {
    switch (filter) {
      case 'all': {
        return tasks;
      }
      case 'active': {
        return tasks.filter((item) => !item.completed);
      }
      case 'completed': {
        return tasks.filter((item) => item.completed);
      }
    }
  }

  const visibleTasks = setVisibleTasks();
  
  return (
    <div className={styles.app}>
      <Header />
      <div className={styles.tasksList}>
        {!visibleTasks?.length && <p className={styles.emptyMessage}>There are no tasks 🤷‍♂️</p>}
        {visibleTasks?.map((task) => (
          <Task 
            key={task.id} 
            id={task.id} 
            text={task.text} 
            createdAt={task.createdAt} 
            isCompleted={task.completed} 
          /> 
        ))}
      </div>
      <Footer />
    </div>
  );
}