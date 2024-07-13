/* eslint-disable no-script-url */
import { ChangeEvent, FormEvent, useContext, useState } from 'react';
import InputTodoContext from '../Contexts/InputTodoContext';

export default function FormInput() {
  const [input, setInput] = useState<{ input: string }>({ input: '' });
  const { handleNewTodo } = useContext(InputTodoContext);

  const handleInputTodo = (event: ChangeEvent<HTMLInputElement>) => {
    setInput({ input: event.target.value });
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    handleNewTodo(input);
    setInput({ input: '' });
  };

  const val = input?.input;

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={val}
          className="form-control add-task"
          onChange={handleInputTodo}
          placeholder="New Task..."
        />
      </form>
    </div>
  );
}
