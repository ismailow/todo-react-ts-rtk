import { FC, useState, useCallback } from 'react';

import styles from './index.module.scss';
import { addTask } from '../../store/todoSlice';
import { useAppDispatch } from '../../hooks';

export const AddInput: FC = () => {
  const [value, setValue] = useState('');
  const dispatch = useAppDispatch();

  const onAddTask = useCallback(() => {
    if (value !== '') {
      dispatch(addTask(value));
      setValue('');
    }
  }, [value]);

  return (
    <div className={styles.inputWrapper}>
      <input
        className={styles.input}
        type='text' 
        value={value}
        placeholder='Drink coffee...'
        onChange={(event) => setValue(event.target.value)}
        onKeyDown={(event) => {          
          if (event.key === 'Enter') {
            onAddTask();
          }
          if (event.key === 'Escape') {
            (document.activeElement as HTMLElement).blur();
          }
        }}
      />
      <button className={styles.button} onClick={onAddTask} />
    </div>
  )
}