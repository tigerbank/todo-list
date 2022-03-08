import { createContext, useReducer } from 'react';

import { StoreContextState } from '@/interfaces/common';

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

function reducer(state: any, action: any) {
  switch (action.type) {
    case 'SET_TODOLISTS': {
      return { ...state, todoLists: action.payload };
    }

    case 'ADD_TODO': {
      return { ...state, todoLists: [...state.todoLists, action.payload] };
    }

    case 'UPDATE_TODO': {
      const todoLists = state.todoLists.map((todoList: any) =>
        todoList.id === action.payload.id
          ? { ...todoList, title: action.payload.title }
          : todoList,
      );

      return { ...state, todoLists };
    }

    case 'REMOVE_TODO': {
      const id = action.payload;
      const todoLists = state.todoLists.filter(
        (todoList: any) => todoList.id !== id,
      );

      return { ...state, todoLists };
    }

    case 'TOGGLE_COMPLETE': {
      const id = action.payload;

      const todoLists = state.todoLists.map((todoList: any) =>
        todoList.id === id
          ? { ...todoList, completed: !todoList.completed }
          : todoList,
      );

      return { ...state, todoLists };
    }

    case 'UPDATE_FILTER': {
      // const todoLists = state.todoLists.filter((todoList: any) => {
      //   if (action.payload === 'All') {
      //     return todoList;
      //   }

      //   if (action.payload === 'Done') {
      //     return todoList.completed === true;
      //   }

      //   if (action.payload === 'Undone') {
      //     return todoList.completed === false;
      //   }
      // });

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
