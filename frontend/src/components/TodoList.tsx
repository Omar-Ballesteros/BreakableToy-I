import { useEffect, useState } from 'react';
import axios from 'axios';
import TodoItem from './TodoItem';

export default function TodoList() {

    const urlBase = "http://localhost:9090/api/todos"
    
    const [todos, setTodos] = useState([]);

    useEffect(() => {
        loadTodos();
    }, []);

    const loadTodos = async () => {
        const result = await axios.get(urlBase);
        setTodos(result.data);
    }

  return (
        <div className='flex items-center justify-center mx-auto bg-slate-50 rounded-md p-5'>

            <table className="table-auto align-middle border border-gray-400 p-4 w-4/5">
            <thead className='bg-gray-300'>
                <tr className='p-4 border border-gray-400'>
                <th className='p-4 border border-gray-400' scope='col'>Done</th>
                <th className='p-4 border border-gray-400' scope='col'>Name</th>
                <th className='p-4 border border-gray-400' scope='col'>Priority</th>
                <th className='p-4 border border-gray-400' scope='col'> Due Date</th>
                <th className='p-4 border border-gray-400' scope='col'>Actions</th>
                </tr>
            </thead>
            <tbody>
                {
                    //iterates todo array
                    todos.map((todo) =>(
                        <TodoItem key={todo.id} todo={todo} />
                    ))
                }
            </tbody>
            </table>
        </div>
  )
}
