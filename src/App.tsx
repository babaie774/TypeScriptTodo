import { createContext, useEffect, useState } from 'react';
import HandleStatusContext from './Component/Contexts/HandleStatusContext';
import InputTodoContext from './Component/Contexts/InputTodoContext';
import TodoList from './Component/TodoList';
import './Style/Style.css';

interface Todo {
  id: number;
  content: string;
  status: 'active' | 'completed';
}

// Create and type the context
const TodoContext = createContext<Todo[]>([]);

export default function App() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [filter, setFilter] = useState<'all' | 'completed' | 'active'>('all');

  useEffect(() => {
    const localStorageData = JSON.parse(
      localStorage.getItem('todos') as string,
    ) as Todo[];
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
      { id: todos.length + 1, content: input.input, status: 'active' },
    ]);
  };

  const handleStatusTodo = (id: number): void => {
    setTodos((prevTodos) => {
      return prevTodos.map((item) =>
        item.id === id
          ? {
              ...item,
              status: item.status === 'active' ? 'completed' : 'active',
            }
          : item,
      );
    });
  };

  const handleFilterValue = (filter: 'all' | 'completed' | 'active') => {
    setFilter(filter);
  };

  return (
    <>
      <TodoContext.Provider value={todos}>
        <InputTodoContext.Provider value={{ InputTodo: handleNewTodo }}>
          <HandleStatusContext.Provider
            value={{ StatusTodo: handleStatusTodo }}
          >
            <TodoList handleFilterValue={handleFilterValue} filter={filter} />
          </HandleStatusContext.Provider>
        </InputTodoContext.Provider>
      </TodoContext.Provider>
    </>
  );
}
