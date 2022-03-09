import React from 'react';
import { motion } from 'framer-motion';
import AddTodo from './AddTodo';
import Progress from './Progress';
import Tasks from './Tasks';
import styles from './TodoList.module.scss';

function TodoList() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className={styles.todoList}
    >
      <Progress />
      <Tasks />
      <AddTodo />
    </motion.div>
  );
}

export default TodoList;
