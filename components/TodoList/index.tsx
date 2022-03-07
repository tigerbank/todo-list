import React from 'react';
import AddTodo from './AddTodo';
import Progress from './Progress';
import Tasks from './Tasks';
import styles from './TodoList.module.scss';

function TodoList() {
  return (
    <div className={styles.todoList}>
      <Progress />
      <Tasks />
      <AddTodo />
    </div>
  );
}

export default TodoList;
