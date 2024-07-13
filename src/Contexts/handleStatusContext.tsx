import React from 'react';

const HandleStatusContext = React.createContext({
  handleStatusTodo: (id: number) => {},
});

export default HandleStatusContext;
