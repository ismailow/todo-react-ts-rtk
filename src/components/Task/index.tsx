import { FC, useState } from 'react';
import { toggleDone, updateTaks, deleteTask } from "../../store/todoSlice";
import { useAppDispatch } from "../../hooks";
import formatDistanceToNow from 'date-fns/formatDistanceToNow'

import styles from './index.module.scss';

interface ITaskProps {
  id: string,
  text: string,
  createdAt: number,
  isCompleted: boolean,
}

export const Task: FC<ITaskProps> = ({id, text, createdAt, isCompleted}) => {
  const [isEditMode, setIsEditMode] = useState(false);
  const [value, setValue] = useState(text);
  const dispatch = useAppDispatch();

  const onEditTask = () => {
    dispatch(updateTaks({id, text: value}));
    setIsEditMode(false);
  }

  return (
    <div className={styles.task}>
      <label>
        <input 
          className={styles.checkbox}
          type="checkbox" 
          checked={isCompleted} 
          disabled={isEditMode}
          onChange={() => {
            dispatch(toggleDone(id));
          }}
        />
        {isEditMode ? 
          (<input
              value={value}
              onChange={(event) => setValue(event.target.value)}
              className={styles.editInput}
              autoFocus
              onKeyDown={(event) => {                
                if (event.key === 'Enter') {
                  onEditTask();
                }
              }}
            />) 
          : 
          (<h3 className={styles.text}>{text}</h3>)
        }
      </label>
      <p className={styles.date}>{!isEditMode && formatDistanceToNow(createdAt)}</p>
      {isEditMode ? 
        (
          <button 
            className={styles.save} 
            onClick={() => {
              onEditTask()
            }} 
          />
        ) 
        :
        (<button 
          className={styles.edit} 
          disabled={isCompleted}
          onClick={() => {            
            setIsEditMode(true);
          }} 
        />)
      }
      {isEditMode ? 
        (
          <button 
            className={styles.cancel} 
            onClick={() => {
              setIsEditMode(false);
              setValue(text);
            }} 
          />
        ) 
        :
        (
          <button className={styles.remove} onClick={() => dispatch(deleteTask(id))} />
        )
      }
    </div>
  );
};
