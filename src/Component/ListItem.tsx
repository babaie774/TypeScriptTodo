/* eslint-disable no-useless-rename */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useContext } from 'react';
import HandleStatusContext from '../Contexts/handleStatusContext';
import InputTodoContext from '../Contexts/InputTodoContext';
import TodoContext from '../Contexts/TodoContext';
import { onDragOver, onDragStart, onDrop, persianDateTimeFormatter } from '../utils/utils';

type ListItemProps = {
  filter: string;
};

const ListItem: React.FC<ListItemProps> = ({ filter }) => {
  const todoList = useContext(TodoContext);
  const { handleStatusTodo } = useContext(HandleStatusContext);
  const { handleNewOrderTodos } = useContext(InputTodoContext);

  const filteredTodos =
    filter !== 'all'
      ? todoList.filter((todo: any) => todo?.status === filter)
      : todoList;

  const todos = filteredTodos.map((todo: any, index: number) => {
    const checked = todo?.status === 'completed' ? `line-through` : ``;
    const content = todo?.content || 'No content available';
    const time = todo?.time
      ? persianDateTimeFormatter(todo?.time)
      : 'No time available';
    return (
      <li
        key={index}
        draggable
        id={`${index}`}
        onDragStart={(e) => onDragStart(e, index)}
        onDragOver={onDragOver}
        onDrop={(e) => onDrop(e, index, handleNewOrderTodos, todoList)}
        style={{
          textDecoration: checked,
        }}
        onClick={() => handleStatusTodo(todo?.id)}
      >
        {content} - {time}
      </li>
    );
  });
  return (
    <div>
      <div className="todo-item">
        <ul className="float-right text-decoration-line">{todos}</ul>
      </div>
    </div>
  );
};

export default ListItem;
