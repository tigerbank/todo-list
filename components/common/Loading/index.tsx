import Image from 'next/image';
import React from 'react';
import styles from './Loading.module.scss';

function Loading() {
  return (
    <div className={styles.loading}>
      <Image
        src="/images/loading.svg"
        layout="fixed"
        width="57"
        height="57"
        alt=""
      />
    </div>
  );
}

export default Loading;
