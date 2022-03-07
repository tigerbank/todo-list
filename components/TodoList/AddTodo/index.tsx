import React from 'react';
import styles from './AddTodo.module.scss';

function AddTodo() {
  return (
    <div className={styles.addTodo}>
      <input type="text" placeholder="Add your todo..." />
    </div>
  );
}

export default AddTodo;
