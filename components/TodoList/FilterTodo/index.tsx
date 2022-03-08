import React, { useContext, useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import styles from './FilterTodo.module.scss';
import { Store } from '@/utils/Store';

function FilterTodo({ onClickOutside }: { onClickOutside: any }) {
  const { state, dispatch } = useContext(Store);
  const [isOpen, setIsOpen] = useState(false);

  const ref = useRef<any>();

  const handleClick = (e: any) => {
    dispatch({ type: 'UPDATE_FILTER', payload: e.target.innerText });
    setIsOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (event: any) => {
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
        <Image src="/images/arrow-down.svg" alt="" width="8" height="5" />
      </button>
      {isOpen && (
        <ul ref={ref}>
          <li onClick={(e) => handleClick(e)}>All</li>
          <li onClick={(e) => handleClick(e)}>Done</li>
          <li onClick={(e) => handleClick(e)}>Undone</li>
        </ul>
      )}
    </div>
  );
}

export default FilterTodo;
