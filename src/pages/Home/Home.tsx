import { useEffect, useState } from 'react';
import Create from '../../Cruds/Create';
import axios from 'axios';

// Define a type for your Todo
interface Todo {
    id: number; // Assuming ID is a number
    task: string; // Assuming each todo has a 'task' property
}

function Home() {
    const [todos, setTodos] = useState<Todo[]>([]); // Specify that todos is an array of Todo
    const [error, setError] = useState<string | null>(null); // Add error state

    useEffect(() => {
        const fetchTodos = async () => {
            try {
                const result = await axios.get<Todo[]>('http://localhost:3001/get');
                setTodos(result.data);
            } catch (err) {
                console.error("Error fetching todos:", err);
                setError("Failed to fetch todos."); // Set an error message
            }
        };

        fetchTodos();
    }, []); // Fetch todos on component mount

    return (
        <div>
            <h1>Hello World</h1>
            <Create />
            {error && <p style={{ color: 'red' }}>{error}</p>} {/* Display error message */}
            {todos.length === 0 ? (
                <p>No todos</p>
            ) : (
                todos.map((todo) => (
                    <div key={todo.id || Math.random().toString(36)}> {/* Add fallback key */}
                        {todo.task}
                    </div>
                ))
            )}
        </div>
    );
}

export default Home;
