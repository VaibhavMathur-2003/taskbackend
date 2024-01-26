const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const Task = require("./Models/Task");
const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
require("dotenv").config();

mongoose.connect(
  process.env.MONGO_URL,
  // "mongodb+srv://mathurvaibhav010:hCelqeoze4Nihcpj@cluster0.ihuidvq.mongodb.net/?retryWrites=true&w=majority",
  {}
).then(() => {
  console.log("DB Connetion Successfull");
})
.catch((err) => {
  console.log(err.message);
});;


app.get("/api/tasks", async (req, res) => {
  try {
    const tasks = await Task.find();
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
});

app.get("/api/tasks/:id", async (req, res) => {
  try {
    const taskId = req.params.id;
    const task = await Task.findById(taskId);

    if (!task) {
      return res.status(404).json({ error: "Task not found" });
    }

    res.json(task);
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
});

app.post("/api/tasks", async (req, res) => {
  try {
    const { task, description, completed, difficulty } = req.body;
    const newtask = new Task({ task, description, completed, difficulty });
    await newtask.save();
    res.json(newtask);
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
});

app.put("/api/tasks/:id", async (req, res) => {
  try {
    const taskId = req.params.id;
    const { task, description, completed, difficulty } = req.body;

    const updatedTask = await Task.findByIdAndUpdate(
      taskId,
      { task, description, completed, difficulty },
      { new: true }
    );

    res.json(updatedTask);
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
});

app.put("/api/tasks/:id/status", async (req, res) => {
  try {
    const taskId = req.params.id;
    const updatedTask = await Task.findByIdAndUpdate(
      taskId,
      { completed: req.body.completed },
      { new: true }
    );
    res.json(updatedTask);
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
});

app.delete("/api/tasks/:id", async (req, res) => {
  try {
    const taskId = req.params.id;
    const deletedTask = await Task.findByIdAndDelete(taskId);
    res.json(deletedTask);
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
