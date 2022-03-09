import { createContext, useReducer } from 'react';

import { StoreContextState, TodoProps } from '@/interfaces/common';

const initialState = {
  todoLists: [],
  filter: 'All',
};

export const Store = createContext<{
  state: StoreContextState;
  dispatch: React.Dispatch<any>;
}>({
  state: initialState,
  dispatch: () => null,
});

function reducer(state: StoreContextState, action: any) {
  switch (action.type) {
    case 'SET_TODOLISTS': {
      return { ...state, todoLists: action.payload };
    }

    case 'ADD_TODO': {
      return { ...state, todoLists: [...state.todoLists, action.payload] };
    }

    case 'UPDATE_TODO': {
      const todoLists = state.todoLists.map((todoList: TodoProps) =>
        todoList.id === action.payload.id
          ? { ...todoList, title: action.payload.title }
          : todoList,
      );

      return { ...state, todoLists };
    }

    case 'DELETE_TODO': {
      const id = action.payload;
      const todoLists = state.todoLists.filter(
        (todoList: TodoProps) => todoList.id !== id,
      );

      return { ...state, todoLists };
    }

    case 'TOGGLE_COMPLETE': {
      const id = action.payload;

      const todoLists = state.todoLists.map((todoList: TodoProps) =>
        todoList.id === id
          ? { ...todoList, completed: !todoList.completed }
          : todoList,
      );

      return { ...state, todoLists };
    }

    case 'UPDATE_FILTER': {
      return { ...state, filter: action.payload };
    }

    default:
      return state;
  }
}

export function StoreProvider({ children }: any) {
  const [state, dispatch] = useReducer(reducer, initialState);
  const value = { state, dispatch };
  return <Store.Provider value={value}>{children}</Store.Provider>;
}
