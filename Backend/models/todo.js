const mongoose = require('mongoose');

const todoSchema = new mongoose.Schema({
    task: {
        type: String,
        required: true,
    },
    completed: {
        type: Boolean,
        default: false, // Ensure a default value if not provided
    }
});

module.exports = mongoose.model('Todo', todoSchema);
