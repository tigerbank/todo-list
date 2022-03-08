import React, { useContext, useState } from 'react';
import axios from 'axios';
import styles from './AddTodo.module.scss';
import { Store } from '@/utils/Store';

function AddTodo() {
  const [inputText, setInputText] = useState('');
  const { dispatch } = useContext(Store);

  const handleKeyPress = async (event: any) => {
    if (event.key === 'Enter') {
      const response = await axios.post(`http://localhost:3001/todos/`, {
        title: inputText,
        completed: false,
      });
      dispatch({ type: 'ADD_TODO', payload: response.data });
      setInputText('');
    }
  };
  return (
    <div className={styles.addTodo}>
      <input
        maxLength={70}
        onChange={(e) => setInputText(e.target.value)}
        onKeyPress={handleKeyPress}
        type="text"
        placeholder="Add your todo..."
        value={inputText}
      />
    </div>
  );
}

export default AddTodo;
