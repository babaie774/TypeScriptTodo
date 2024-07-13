import React from 'react';
import { TodoType } from '../types/type';

const TodoContext = React.createContext<TodoType[]>([]);

export default TodoContext;
