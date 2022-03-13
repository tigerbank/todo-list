import React, { useContext, useEffect, useState } from 'react';
import styles from './AddTodo.module.scss';
import { Store } from '@/utils/Store';
import { addTodo } from '@/utils/api';

function AddTodo() {
  const noTextMessage = 'You need to write something!';
  const [inputText, setInputText] = useState('');
  const [loading, setLoading] = useState(false);
  const { dispatch } = useContext(Store);
  const [errorMessage, setErrorMessage] = useState('');

  const addData = async () => {
    setLoading(true);
    const response = await addTodo(inputText);
    dispatch({ type: 'ADD_TODO', payload: response.data });
    setInputText('');
    setLoading(false);
  };

  const handleKeyPress = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.key === 'Enter' && inputText.length > 0 && !loading) {
      addData();
    } else {
      setErrorMessage(noTextMessage);
    }
  };

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    if (inputText.length > 0 && !loading) {
      addData();
    } else {
      setErrorMessage(noTextMessage);
    }
  };

  return (
    <div id="addTodo" className={styles.addTodo}>
      <input
        maxLength={70}
        onChange={(e) => {
          setInputText(e.target.value);
          inputText === ''
            ? setErrorMessage(noTextMessage)
            : setErrorMessage('');
        }}
        onKeyPress={handleKeyPress}
        type="text"
        placeholder="Add your todo..."
        value={inputText}
      />
      {inputText.length === 0 && errorMessage !== '' && (
        <div className={styles.addTodo__errorMessage}>{errorMessage}</div>
      )}
      <button onClick={handleClick} className={styles.addTodo__button}>
        Add
      </button>
    </div>
  );
}

export default AddTodo;
