import React, { useContext, useState } from 'react';
import styles from './AddTodo.module.scss';
import { Store } from '@/utils/Store';
import { addTodo } from '@/utils/api';

function AddTodo() {
  const [inputText, setInputText] = useState('');
  const { dispatch } = useContext(Store);

  const handleKeyPress = async (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.key === 'Enter') {
      const response = await addTodo(inputText);
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
