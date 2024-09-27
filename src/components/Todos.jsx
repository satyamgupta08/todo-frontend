import React from 'react';

const Todos = ({ todos, setTodos }) => {
  const markComplete = (id) => {
    fetch("https://todo-backend-ten-nu.vercel.app/completed", {
      method: "PUT",
      body: JSON.stringify({
        id: id
      }),
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then((res) => {
        return fetch("https://todo-backend-ten-nu.vercel.app/todos");
      })
      .then(async (res) => {
        const json = await res.json();
        setTodos(json.todos);
      })
      .catch((err) => console.error("Error fetching todos:", err));
  };
  const deleteTodo = (id) => {
    fetch(`https://todo-backend-ten-nu.vercel.app/todos/${id}`, {
      method: "DELETE"
    })
      .then((res) => {
        return fetch("https://todo-backend-ten-nu.vercel.app/todos");
      })
      .then(async (res) => {
        const json = await res.json();
        setTodos(json.todos);
      })
      .catch((err) => console.error("Error deleting todo:", err));
  };
  return (
    <div>
      {todos.map((todo) => (
        <div key={todo._id} className='sm:w-[50vw] w-[80vw] px-4 text-white border-white border-2 flex flex-col items-center justify-center rounded-3xl pt-[15px] pb-[30px] mb-[30px]'>
          <h1 className='text-3xl'>{todo.title}</h1>
          <h2 className='mt-[5px]'>{todo.description}</h2>

          {todo.completed ? (
            <div className='sm:w-[40vw] w-[80vw] flex justify-center items-center gap-x-5 mt-[15px]'>
            <button
              className="w-5/12 bg-white text-lg text-black py-1 rounded-lg font-bold"
              onClick={() => markComplete(todo._id)}
            >
              Mark as Not Completed
            </button>
            <button
              className="w-5/12 bg-white text-lg text-black py-1 rounded-lg font-bold"
              onClick={() => deleteTodo(todo._id)}
            >
             Delete Todo
            </button>
            </div>
          ) : (
            <button
              className="w-5/12 bg-white text-lg text-black py-1 rounded-lg font-bold mt-[15px]"
              onClick={() => markComplete(todo._id)}
            >
              Mark as Completed
            </button>
          )}
        </div>
      ))}
    </div>
  );
};

export default Todos;
