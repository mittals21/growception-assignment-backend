const Task = require("../models/task.model")

exports.createTask = async (req, res) => {
  try {
    const task = await Task.create(req.body)
    res.status(201).json(task)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}

exports.getTasks = async (req, res) => {
  try {
    let tasks
    if (req.user.role === "admin") {
      tasks = await Task.find().populate("assignedTo")
    } else {
      tasks = await Task.find({ assignedTo: req.user.id })
    }
    res.json(tasks)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}

exports.updateTask = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id)
    if (!task) return res.status(404).json({ message: "Task not found" })

    if (
      req.user.role === "member" &&
      task.assignedTo.toString() !== req.user.id
    ) {
      return res.status(403).json({ message: "Access denied" })
    }

    const updated = await Task.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    })
    res.json(updated)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}

exports.deleteTask = async (req, res) => {
  try {
    const task = await Task.findByIdAndDelete(req.params.id)
    if (!task) return res.status(404).json({ message: "Task not found" })
    res.json({ message: "Task deleted" })
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}
