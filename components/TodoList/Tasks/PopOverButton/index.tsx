import React, { useContext, useEffect, useRef, useState } from 'react';
import axios from 'axios';
import Image from 'next/image';
import styles from './PopOverButton.module.scss';
import { Store } from '@/utils/Store';

function PopOverButton({
  todoList,
  handleEdit,
  onClickOutside,
}: {
  todoList: any;
  handleEdit: any;
  onClickOutside: () => void;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const { dispatch } = useContext(Store);
  const ref = useRef<any>();

  const removeTodo = async (id: number) => {
    let text = 'Are you sure you want to delete? \nPress OK or Cancel.';
    if (confirm(text) === true) {
      dispatch({ type: 'REMOVE_TODO', payload: id });
      await axios.delete(`http://localhost:3001/todos/${id}`);
    }
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
    <div className={styles.popOverButton} onClick={() => setIsOpen(!isOpen)}>
      <Image
        src="/images/list-button.svg"
        alt="button"
        layout="fixed"
        width="20"
        height="6"
      />
      {isOpen && (
        <ul
          ref={ref}
          onBlur={() => {
            setIsOpen(false);
          }}
        >
          <li onClick={() => handleEdit(todoList)}>Edit</li>
          <li onClick={() => removeTodo(todoList.id)}>Delete</li>
        </ul>
      )}
    </div>
  );
}

export default PopOverButton;
