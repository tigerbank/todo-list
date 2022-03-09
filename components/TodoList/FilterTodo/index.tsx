import React, { useContext, useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import styles from './FilterTodo.module.scss';
import { Store } from '@/utils/Store';

function FilterTodo({ onClickOutside }: { onClickOutside: any }) {
  const { state, dispatch } = useContext(Store);
  const [isOpen, setIsOpen] = useState(false);

  const ref = useRef<any>();

  const handleClick = (e: React.MouseEvent<HTMLLIElement>) => {
    const element = e.target as HTMLElement;
    dispatch({ type: 'UPDATE_FILTER', payload: element.innerText });
    setIsOpen(false);
  };

  useEffect(() => {
    const handleClickOutside: any = (
      event: React.MouseEvent<HTMLLIElement>,
    ) => {
      if (ref.current && !ref.current.contains(event.target)) {
        onClickOutside && onClickOutside();
        setIsOpen(false);
      }
    };
    document.addEventListener('click', handleClickOutside, true);
    return () => {
      document.removeEventListener('click', handleClickOutside, true);
    };
  }, [onClickOutside]);

  return (
    <div className={styles.filterTodo}>
      <button onClick={() => setIsOpen(true)}>
        <span>{state.filter}</span>
        <motion.div
          initial={!isOpen ? { rotateZ: 180 } : { rotateZ: 0 }}
          animate={!isOpen ? { rotateZ: 0 } : { rotateZ: 180 }}
        >
          <Image src="/images/arrow-down.svg" alt="" width="8" height="5" />
        </motion.div>
      </button>
      {isOpen && (
        <motion.ul
          ref={ref}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.2 }}
        >
          <li onClick={(e) => handleClick(e)}>All</li>
          <li onClick={(e) => handleClick(e)}>Done</li>
          <li onClick={(e) => handleClick(e)}>Undone</li>
        </motion.ul>
      )}
    </div>
  );
}

export default FilterTodo;
