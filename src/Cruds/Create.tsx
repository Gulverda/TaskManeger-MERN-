import { useState, ChangeEvent, FormEvent } from "react";
import axios from "axios";

function Create() {
    const [task, setTask] = useState<string>(""); 
    const [error, setError] = useState<string | null>(null);

    const handleAdd = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault(); 

        if (!task.trim()) {
            setError("Task cannot be empty.");
            return;
        }

        setError(null); 

        axios.post('http://localhost:3001/create', { task })  // Updated URL
            .then((res) => {
                console.log(res.data);
                setTask(""); 
            })
            .catch((err) => {
                console.error("Error adding task:", err);
            });
    };

    const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        setTask(e.target.value); 
    };

    return (
        <div>
            <h1>Create Task</h1>
            <form onSubmit={handleAdd}>
                <input
                    type="text"
                    placeholder="Enter Task"
                    value={task} 
                    onChange={handleInputChange} 
                />
                <button type="submit">Add</button>
            </form>
            {error && <p style={{ color: 'red' }}>{error}</p>}
        </div>
    );
}

export default Create;
