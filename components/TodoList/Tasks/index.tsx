import React, { useContext, useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import styles from './Tasks.module.scss';
import PopOverButton from './PopOverButton';
import FilterTodo from '@/components/TodoList/FilterTodo';
import { Store } from '@/utils/Store';
import Loading from '@/components/common/Loading';
import { getTodoLists, toggleCheckBox, updateTodo } from '@/utils/api';
import { TodoProps } from '@/interfaces/common';

function Tasks() {
  const { state, dispatch } = useContext(Store);
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [inputEdit, setInputEdit] = useState('');
  const [editId, setEditId] = useState('');
  const [filteredLists, setFilteredLists] = useState<TodoProps[]>([]);

  const fetchTodoLists = async () => {
    try {
      setLoading(true);
      const todoLists = await getTodoLists();
      dispatch({ type: 'SET_TODOLISTS', payload: todoLists });
      setLoading(false);
    } catch (error) {
      setLoading(false);
      setMessage('Opps! Something went wrong');
    }
  };

  useEffect(() => {
    fetchTodoLists();
  }, []);

  const handleToggleCheckBox = async (selectedTodo: TodoProps) => {
    dispatch({ type: 'TOGGLE_COMPLETE', payload: selectedTodo.id });
    await toggleCheckBox(selectedTodo);
  };

  const handleEdit = (todoList: TodoProps) => {
    setInputEdit(todoList.title);
    setEditId(todoList.id);
  };

  const handleUpdateTodo = async (selectedTodo: TodoProps) => {
    dispatch({
      type: 'UPDATE_TODO',
      payload: { ...selectedTodo, title: inputEdit },
    });
    await updateTodo(selectedTodo, inputEdit);
    setEditId('');
  };

  useEffect(() => {
    const filtered = state.todoLists.filter((todoList: TodoProps) => {
      if (state.filter === 'All') {
        return todoList;
      }

      if (state.filter === 'Done') {
        return todoList.completed === true;
      }

      if (state.filter === 'Undone') {
        return todoList.completed === false;
      }
    });

    setFilteredLists(filtered);
  }, [state.filter, state.todoLists]);

  if (loading) {
    return <Loading />;
  }

  if (message !== '') {
    return (
      <div id="message" className={styles.tasks__message}>
        {message}
      </div>
    );
  }

  if (state.todoLists.length === 0) {
    return (
      <div className={styles.tasks__message}>
        Nothing is in the list! Please add your first todo.
      </div>
    );
  }

  return (
    <div className={styles.tasks}>
      <div className={styles.tasks__headerFlex}>
        <h3 className={styles.tasks__title}>Tasks</h3>
        <FilterTodo onClickOutside={() => {}} />
      </div>

      <motion.ul id="taskLists" className={styles.tasks__lists}>
        {filteredLists &&
          filteredLists.map((todoList: TodoProps, index: number) => {
            if (todoList.id !== editId) {
              return (
                <li key={todoList.id} data-testid={`task-item-${index}`}>
                  <div className={styles.tasks__listFlex}>
                    <div>
                      <input
                        type="checkbox"
                        checked={todoList.completed}
                        onChange={() => handleToggleCheckBox(todoList)}
                      />
                    </div>

                    {todoList.completed ? (
                      <p
                        className={`${styles.tasks__completedText} tasks__completedText`}
                      >
                        {todoList.title}
                      </p>
                    ) : (
                      <p>{todoList.title}</p>
                    )}
                  </div>

                  <PopOverButton
                    todoList={todoList}
                    handleEdit={handleEdit}
                    onClickOutside={() => {}}
                  />
                </li>
              );
            } else {
              return (
                <li
                  key={todoList.id}
                  className={styles.tasks__editFlex}
                  data-testid={`task-item-${index}`}
                >
                  <div className={styles.tasks__inputFlex}>
                    <input
                      className={`${styles.tasks__inputEdit} tasks__inputEdit`}
                      type="text"
                      defaultValue={todoList.title}
                      onChange={(e) => setInputEdit(e.target.value)}
                    />
                    <motion.button
                      className={styles.tasks__button}
                      whileHover={{ scale: 1.1 }}
                      onClick={() => handleUpdateTodo(todoList)}
                    >
                      Save
                    </motion.button>
                  </div>
                </li>
              );
            }
          })}
      </motion.ul>
    </div>
  );
}

export default Tasks;
