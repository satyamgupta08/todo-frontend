import React, { useState, useEffect } from 'react';
import CreateTodo from './components/CreateTodo';
import Todos from './components/Todos';
import toast from 'react-hot-toast';


const App = () => {
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    fetch("https://todo-backend-ten-nu.vercel.app/todos")
      .then(async (res) => {
        const json = await res.json();
        setTodos(json.todos);          
      })
      .catch((err) => toast.error("error fetching todos"));
  }, []);          

  return (
    <div className='max-w-screen flex flex-col items-center justify-center bg-black min-h-screen'>
    <div className='text-white text-3xl font-semibold mt-[10px]'>Todo App</div>
      <CreateTodo setTodos={setTodos} />
      <Todos todos={todos} setTodos={setTodos} />
    </div>
  );
};

export default App;
