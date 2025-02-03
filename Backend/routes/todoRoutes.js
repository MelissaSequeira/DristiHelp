const express = require('express');
const Todo = require('../models/todo');
const router = express.Router();

// GET all todos
router.get('/', async (req, res) => {
    try {
        const getToDo = await Todo.find();
        res.json(getToDo);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// POST a new todo
router.post('/', async (req, res) => {
    const todo = new Todo({
        task: req.body.task,
    });

    try {
        const newTodo = await todo.save();
        res.status(201).json(newTodo);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

router.patch('/:id', async (req, res) => {
    try {
        const { completed } = req.body;  // Get completed from the request body
        
        // Find the todo by id and update the completed field
        const updatedTodo = await Todo.findByIdAndUpdate(
            req.params.id,
            { completed: completed }, // Update completed status from request body
            { new: true } // Return the updated todo
        );

        if (!updatedTodo) return res.status(404).json({ message: 'Todo not found' });

        res.json(updatedTodo);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});



router.delete('/:id', async (req, res) => {
    try {
        const todo = await Todo.findByIdAndDelete(req.params.id);
        if (!todo) return res.status(404).json({ message: 'Todo not found' });

        await Todo.deleteOne({ _id: req.params.id });
        res.json({ message: 'Todo deleted' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;
