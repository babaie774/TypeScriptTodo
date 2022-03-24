import React, { useEffect, useState } from 'react'
import TodoContext from './Component/Contexts/TodoContext'
import HandleStatusContext from './Component/Contexts/HandleStatusContext'
import InputTodoContext from './Component/Contexts/InputTodoContext'
import TodoList from './Component/TodoList'
import './Style/Style.css'

export default function App() {

  const [todoes, setTodoes] = useState<any>([
    { id: 1, content: "task 1", status: "completed" },
  ])
  const [filter, setFilter] = useState("active");

  
  
  useEffect(() => {
    const localStorageData: any = JSON.parse(localStorage.getItem('todoes') as any);
    setTodoes(
      localStorageData
    );
  }, [])


  useEffect(() => {
    localStorage.setItem('todoes', JSON.stringify(todoes));
  }, [todoes])





  const handleNewTodo = (input: any) => {
    const { input: input2 } = input;
    setTodoes([...todoes, { id: todoes.length + 1, content: input2, status: "active" }])
  }

  const handleStatusTodo = (id: number) => {
    setTodoes((prev: any) => {
      const clone = [...prev];
      clone.map((item: any) => {
        if (item.id === id) {
          item.status = item.status === 'active' ? 'completed' : 'active';
        }
      })
      return clone
    })
  }

  const handleFilterValue = (filter: string) => {
    setFilter(filter);
  };

  return (
    <>
      <TodoContext.Provider value={todoes} >
        <InputTodoContext.Provider value={{ InputTodo: handleNewTodo }} >
          <HandleStatusContext.Provider value={{ StatusTodo: handleStatusTodo }} >
            <TodoList handleFilterValue={handleFilterValue} filter={filter} />
          </HandleStatusContext.Provider>
        </InputTodoContext.Provider>
      </TodoContext.Provider >
    </>
  )
}
