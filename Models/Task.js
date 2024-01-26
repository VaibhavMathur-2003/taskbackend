const mongoose = require('mongoose')

const taskSchema = new mongoose.Schema({
    task: String,
    description: String,
    completed: Boolean,
    difficulty: {
      type: String,
      default: "Low",
    },
  });
  
  const Task = mongoose.model("task", taskSchema);

module.exports = Task;