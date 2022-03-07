import React from 'react';
import styles from './Progress.module.scss';

function Progress() {
  return (
    <div className={styles.progress}>
      <h3 className={styles.progress__title}>Progress</h3>

      <progress className={styles.progress__bar} value="6" max="12" />
      <p className={styles.progress__count}>12 completed</p>
    </div>
  );
}

export default Progress;
