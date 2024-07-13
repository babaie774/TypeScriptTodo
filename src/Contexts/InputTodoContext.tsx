import React from 'react';

const InputTodoContext = React.createContext({
  handleNewTodo: (event: any) => {},
  handleRestTodos: () => {},
  handleSortTodos: (value?: any) => {},
  handleNewOrderTodos: (handleNewOrderTodos: any): void => {},
  order: '"asc" | "dec" | "-"',
});

export default InputTodoContext;
