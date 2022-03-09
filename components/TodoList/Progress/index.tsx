import React, { useContext } from 'react';

import styles from './Progress.module.scss';
import { Store } from '@/utils/Store';
import { TodoProps } from '@/interfaces/common';

function Progress() {
  const { state } = useContext(Store);

  const completedTasks = state.todoLists.filter(
    (todoList: TodoProps) => todoList.completed,
  );

  return (
    <div className={styles.progress}>
      <h3 className={styles.progress__title}>Progress</h3>

      <progress
        className={styles.progress__bar}
        value={completedTasks.length}
        max={state.todoLists.length}
      />
      <p className={styles.progress__count}>
        {completedTasks.length} completed
      </p>
    </div>
  );
}

export default Progress;
