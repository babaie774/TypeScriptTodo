/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useContext } from 'react';
import InputTodoContext from '../Contexts/InputTodoContext';
import { StatusType } from '../types/type';

type TodoNavProps = {
  handleFilterValue: (filter: StatusType) => void;
};

const TodoNav: React.FC<TodoNavProps> = ({ handleFilterValue }) => {
  const { handleRestTodos, handleSortTodos, order } =
    useContext(InputTodoContext);

  const status: Array<StatusType> = ['all', 'active', 'completed'];

  const navList = status.map((item, index) => {
    return (
      <button
        type="button"
        className="btn btn-primary mx-1"
        style={{
          minWidth: 80,
        }}
        onClick={() => handleFilterValue(item)}
        key={index}
        role="presentation"
      >
        {item}
      </button>
    );
  });

  return (
    <div className="flex gap-1">
      {navList}
      <button
        type="button"
        className="btn btn-danger m-2"
        onClick={() => handleRestTodos()}
      >
        Delete All
      </button>
      <button
        type="button"
        className="btn btn-warning m-2"
        onClick={() => {
          handleSortTodos();
        }}
      >
        Sort By {order}
      </button>
    </div>
  );
};

export default TodoNav;
