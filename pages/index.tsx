import type { NextPage } from 'next';
import TodoList from '../components/TodoList';

import styles from '../styles/Home.module.css';

const Home: NextPage = () => {
  return (
    <div className={styles.container}>
      <TodoList />
    </div>
  );
};

export default Home;
