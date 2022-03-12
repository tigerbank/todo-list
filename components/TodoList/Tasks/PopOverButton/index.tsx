import React, { useContext, useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import styles from './PopOverButton.module.scss';
import { Store } from '@/utils/Store';
import { deleteTodo } from '@/utils/api';
import { TodoProps } from '@/interfaces/common';

function PopOverButton({
  todoList,
  handleEdit,
  onClickOutside,
}: {
  todoList: TodoProps;
  handleEdit: any;
  onClickOutside: () => void;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const { dispatch } = useContext(Store);
  const ref = useRef<any>();

  const handleDeleteTodo = async (id: string) => {
    let text = 'Are you sure you want to delete? \nPress OK or Cancel.';
    if (confirm(text) === true) {
      dispatch({ type: 'DELETE_TODO', payload: id });
      await deleteTodo(id);
    }
  };

  useEffect(() => {
    const handleClickOutside: any = (event: React.MouseEvent<HTMLElement>) => {
      if (ref.current && !ref.current.contains(event.target)) {
        onClickOutside && onClickOutside();
        setIsOpen(false);
        console.log(typeof handleClickOutside);
      }
    };

    document.addEventListener('click', handleClickOutside, true);
    return () => {
      document.removeEventListener('click', handleClickOutside, true);
    };
  }, [onClickOutside]);

  return (
    <div className={styles.popOverButton} onClick={() => setIsOpen(!isOpen)}>
      <motion.div whileHover={{ scale: 1.3 }}>
        <Image
          src="/images/list-button.svg"
          alt="button"
          layout="fixed"
          width="20"
          height="6"
        />
      </motion.div>

      {isOpen && (
        <motion.ul
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.2 }}
          ref={ref}
          onBlur={() => {
            setIsOpen(false);
          }}
        >
          <li className="popover__edit" onClick={() => handleEdit(todoList)}>
            Edit
          </li>
          <li
            className="popover__delete"
            onClick={() => handleDeleteTodo(todoList.id)}
          >
            Delete
          </li>
        </motion.ul>
      )}
    </div>
  );
}

export default PopOverButton;
