import { FC } from 'react';

import { AddInput } from '../AddInput';

import styles from './index.module.scss';

export const Header: FC = () => {
  return (
    <div className={styles.wrapper}>
      <h1 className={styles.title}>To Do App</h1>
      <AddInput />
    </div>
  )
}