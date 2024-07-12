/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';

type TodoNavProps = {
  handleFilterValue: (filter: 'all' | 'completed' | 'active') => void;
};

const TodoNav: React.FC<TodoNavProps> = (props) => {
  const status: Array<'all' | 'completed' | 'active'> = [
    'all',
    'active',
    'completed',
  ];

  const navList = status.map((item, index) => {
    return (
      <li key={index} role="presentation" className={`nav-item ${item}-task`}>
        <a
          href="#"
          onClick={() => props.handleFilterValue(item)}
          className="nav-link"
        >
          {item}
        </a>
      </li>
    );
  });

  return <ul className="nav nav-pills todo-nav">{navList}</ul>;
};

export default TodoNav;
