import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import Todo from './Models/Todo.js';

const app = express();
const port = 3001;

// Middleware
app.use(cors()); // Enable CORS
app.use(express.json()); // Parse incoming JSON requests

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/todo', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => console.log('MongoDB connected'))
.catch(err => console.error('MongoDB connection error:', err));

app.get('/get', (req, res) => {
    Todo.find()
    .then(result => res.json(result))
    .catch(err => {
        console.error("Error fetching todos:", err); // Log the error
        res.status(500).json({ error: "Failed to fetch todos." });
    });
});

    


// POST endpoint to create a new todo
app.post('/create', (req, res) => {
    const { task } = req.body; // Destructure task from request body

    // Validate task input
    if (!task) {
        return res.status(400).json({ error: 'Task is required' });
    }

    Todo.create({ task }) // Create a new todo
        .then(result => res.status(201).json(result)) // Send the created todo as JSON
        .catch(err => res.status(500).json({ error: err.message })); // Send error response
});


// Start the server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});