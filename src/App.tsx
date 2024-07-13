import { useEffect, useState } from 'react';
import TodoList from './Component/TodoList';
import HandleStatusContext from './Contexts/handleStatusContext';
import InputTodoContext from './Contexts/InputTodoContext';
import TodoContext from './Contexts/TodoContext';
import './Style/Style.css';
import { StatusType, TodoType } from './types/type';

export default function App() {
  const [todos, setTodos] = useState<TodoType[]>([]);
  const [filter, setFilter] = useState<StatusType>('all');
  const [order, setOrder] = useState<'asc' | 'dec' | '-'>('-');

  console.log(todos);

  useEffect(() => {
    const localStorageData = JSON.parse(
      localStorage.getItem('todos') as string,
    ) as TodoType[];
    if (localStorageData) {
      setTodos(localStorageData);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  const handleNewTodo = (input: { input: string }) => {
    setTodos([
      ...todos,
      {
        id: todos.length + 1,
        content: input.input,
        time: new Date().getTime(),
        status: 'active',
      },
    ]);
  };

  const handleNewOrderTodos = (newTodos: any) => {
    setTodos(newTodos);
    setOrder('-');
  };

  const handleRestTodos = () => {
    setTodos([]);
  };

  const handleStatusTodo = (id: number): void => {
    setTodos((prevTodos: any) => {
      return prevTodos.map((item: TodoType) =>
        item.id === id
          ? {
              ...item,
              status: item.status === 'active' ? 'completed' : 'active',
            }
          : item,
      );
    });
  };

  const handleFilterValue = (filter: StatusType) => {
    setFilter(filter);
  };

  const handleSortTodos = (value: any) => {
    const newOrderedTodo: TodoType[] = todos.sort((a, b) => {
      const dateA = a.time;
      const dateB = b.time;
      if (order === 'asc') {
        setOrder('dec');
        return dateA - dateB;
      } else {
        setOrder('asc');
        return dateB - dateA;
      }
    });
    setTodos(newOrderedTodo);
  };

  return (
    <>
      <TodoContext.Provider value={todos}>
        <InputTodoContext.Provider
          value={{
            handleNewTodo,
            handleRestTodos,
            handleNewOrderTodos,
            handleSortTodos,
            order,
          }}
        >
          <HandleStatusContext.Provider value={{ handleStatusTodo }}>
            <TodoList handleFilterValue={handleFilterValue} filter={filter} />
          </HandleStatusContext.Provider>
        </InputTodoContext.Provider>
      </TodoContext.Provider>
    </>
  );
}
