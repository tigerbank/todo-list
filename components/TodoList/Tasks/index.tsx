import React from 'react';
import styles from './Tasks.module.scss';

const todos = [
  {
    id: '5fe3f4ca-193c-4170-83c1-cb5a19908601',
    title: 'Buy food for dinner',
    completed: true,
  },
  {
    id: 'f619466c-a016-4281-b584-7db2795d103d',
    title: 'Call Marie at 10.00 PM',
    completed: false,
  },
  {
    id: '5fe3f4ca-193c-4170-83c1-cb5a19908602',
    title: 'Write a react blog post',
    completed: false,
  },
  {
    id: '5fe3f4ca-193c-4170-83c1-cb5a19908602d',
    title: 'Write a react blog post',
    completed: false,
  },
];

function Tasks() {
  return (
    <div className={styles.tasks}>
      <h3 className={styles.tasks__title}>Tasks</h3>
      <ul className={styles.tasks__lists}>
        {todos &&
          todos.map(({ id, title, completed }) => (
            <li key={id}>
              <div>
                <input type="checkbox" />
                {title}
              </div>
              <span className={styles.tasks__button}>
                <img src="/images/list-button.svg" alt="button" />
              </span>
            </li>
          ))}
      </ul>
    </div>
  );
}

export default Tasks;
