import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import FilterTodo from '../FilterTodo';
import styles from './Tasks.module.scss';
import PopOverButton from './PopOverButton';
import { Store } from '@/utils/Store';
import Loading from '@/components/common/Loading';

function Tasks() {
  const { state, dispatch } = useContext(Store);
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [inputEdit, setInputEdit] = useState('');
  const [editId, setEditId] = useState('');
  const [filteredLists, setFilteredLists] = useState([]);

  const getTodoLists = async () => {
    try {
      setLoading(true);
      const todoLists = await axios.get('http://localhost:3001/todos');
      dispatch({ type: 'SET_TODOLISTS', payload: todoLists.data });
      setLoading(false);
    } catch (error) {
      setLoading(false);
      setMessage('Opps! Something went wrong');
    }
  };

  useEffect(() => {
    getTodoLists();
  }, []);

  const toggleCheckBox = async (selectedList: any) => {
    dispatch({ type: 'TOGGLE_COMPLETE', payload: selectedList.id });
    await axios.put(`http://localhost:3001/todos/${selectedList.id}`, {
      ...selectedList,
      completed: !selectedList.completed,
    });
  };

  const handleEdit = (todoList: any) => {
    setInputEdit(todoList.title);
    setEditId(todoList.id);
  };

  const updateTodo = async (todoList: any) => {
    dispatch({
      type: 'UPDATE_TODO',
      payload: { ...todoList, title: inputEdit },
    });
    await axios.put(`http://localhost:3001/todos/${todoList.id}`, {
      ...todoList,
      title: inputEdit,
    });
    setEditId('');
  };

  useEffect(() => {
    const filtered = state.todoLists.filter((todoList: any) => {
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
    return <div className={styles.tasks__message}>{message}</div>;
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

      <ul className={styles.tasks__lists}>
        {filteredLists &&
          filteredLists.map((todoList: any) => {
            if (todoList.id !== editId) {
              return (
                <li key={todoList.id}>
                  <div className={styles.tasks__listFlex}>
                    <div>
                      <input
                        type="checkbox"
                        checked={todoList.completed}
                        onChange={() => toggleCheckBox(todoList)}
                      />
                    </div>

                    {todoList.completed ? (
                      <p className={styles.tasks__completedText}>
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
                <li key={todoList.id} className={styles.tasks__editFlex}>
                  <div className={styles.tasks__inputFlex}>
                    <input
                      className={styles.tasks__inputEdit}
                      type="text"
                      defaultValue={todoList.title}
                      onChange={(e) => setInputEdit(e.target.value)}
                    />
                    <button
                      className={styles.tasks__button}
                      onClick={() => updateTodo(todoList)}
                    >
                      Save
                    </button>
                  </div>
                </li>
              );
            }
          })}
      </ul>
    </div>
  );
}

export default Tasks;
