export interface StoreContextState {
  todoLists: TodoProps[];
  filter: string;
}
export interface TodoProps {
  id: string;
  title: string;
  completed: boolean;
}
