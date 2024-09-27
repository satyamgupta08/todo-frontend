import React, { useState } from 'react';
import toast from 'react-hot-toast';

const CreateTodo = ({setTodos}) => {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");

    const handleSubmit = () => {
        fetch("https://todo-backend-ten-nu.vercel.app/todo", {
            method: "POST",
            body: JSON.stringify({
                title: title,
                description: description
            }),
            headers: {
                "Content-Type": "application/json"  // Correct header key
            }
        }).then(async (res) => {
            setTitle("");
            setDescription("");
            const json = await res.json();
            toast.success("Todo added");
            fetch("https://todo-backend-ten-nu.vercel.app/todos")
            .then(async (res) => {
              const json = await res.json();
              setTodos(json.todos);          
            })
            .catch((err) => console.error("Error fetching todos:", err));
        }).catch((err) => {
            console.error("Error adding todo:", err);
            toast.error("Failed to add todo.");
        });
    };

    return (
        <div className='sm:w-[30vw] w-[80vw] mt-[40px] h-[280px] border-white border-2 flex flex-col items-center justify-center rounded-3xl mb-[30px]'>
        <div className='text-white text-3xl font-semibold'>CreateTodo </div>
            <input 
                type="text"
                className="w-6/12 text-lg py-1 rounded-lg mb-[10px] mt-[30px] text-center"                      
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Enter Title"
            />
            <br />
            <input 
                className="w-6/12 text-lg py-1 rounded-lg mb-[10px] text-center"              
                type="text"
        
                value={description}
                onChange={(e) => setDescription(e.target.value)}  // Corrected typo: setDescription
                placeholder="Enter description"
            />
            <br />
            <button
               className="w-9/12 bg-white text-xl py-1 rounded-lg font-bold"
        
                onClick={handleSubmit}
            >
                Add Todo
            </button>
        </div>
    );
}

export default CreateTodo;
