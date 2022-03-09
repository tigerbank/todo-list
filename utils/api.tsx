import axios from 'axios';
import { TodoProps } from '@/interfaces/common';

export function getApiURL(path: string) {
  return `${process.env.NEXT_PUBLIC_API_URL}${path}`;
}

export async function axiosAPI(path: string) {
  const response = await axios.get(getApiURL(path));
  return response.data;
}

export async function getTodoLists() {
  return axiosAPI('/todos');
}

export async function toggleCheckBox(selectedTodo: TodoProps) {
  return axios.put(
    `${process.env.NEXT_PUBLIC_API_URL}/todos/${selectedTodo.id}`,
    {
      ...selectedTodo,
      completed: !selectedTodo.completed,
    },
  );
}

export async function updateTodo(selectedTodo: TodoProps, inputEdit: string) {
  return axios.put(
    `${process.env.NEXT_PUBLIC_API_URL}/todos/${selectedTodo.id}`,
    {
      ...selectedTodo,
      title: inputEdit,
    },
  );
}

export async function addTodo(inputText: string) {
  return axios.post(`${process.env.NEXT_PUBLIC_API_URL}/todos/`, {
    title: inputText,
    completed: false,
  });
}

export async function deleteTodo(id: string) {
  return axios.delete(`${process.env.NEXT_PUBLIC_API_URL}/todos/${id}`);
}
