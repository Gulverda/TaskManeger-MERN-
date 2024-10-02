import { Schema, model } from 'mongoose';

const todoSchema = new Schema({
    task: { type: String, required: true },
    // No need to specify _id as Mongoose automatically handles it as ObjectId
});

const Todo = model('Todo', todoSchema);

export default Todo;
