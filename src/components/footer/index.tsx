import { FC } from 'react';
import { useAppSelector, useAppDispatch } from '../../hooks';
import { toggleFilter } from '../../store/todoSlice';

import styles from './index.module.scss';

export const Footer: FC = () => {
  const { tasks, filter } = useAppSelector((state) => state.todos);

  const dispatch = useAppDispatch();

  const buttons = [
    {
      label: 'All',
      value: 'all',
    },
    {
      label: 'Active',
      value: 'active',
    },
    {
      label: 'Completed',
      value: 'completed',
    },
  ]

  return (
    <div className={styles.footer}>
      <div className={styles.filterBtns}>
        {buttons.map((btn) => (
          <button 
            key={btn.value}
            className={filter === btn.value ? `${styles.filterBtn} ${styles.filterBtnActive}` : styles.filterBtn}
            onClick={() => dispatch(toggleFilter(btn.value))}
          >
            {btn.label}
          </button>
        ))}
      </div>
      <div className={styles.countBlock}>
        Total tasks: {tasks.length}
      </div>
    </div>
  );
}