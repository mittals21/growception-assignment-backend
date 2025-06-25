const express = require("express")
const router = express.Router()
const protect = require("../middleware/auth.middleware")
const authorizeRoles = require("../middleware/role.middleware")
const {
  createTask,
  getTasks,
  updateTask,
  deleteTask,
} = require("../controllers/task.controller")

router.post("/", protect, authorizeRoles("admin"), createTask)
router.delete("/:id", protect, authorizeRoles("admin"), deleteTask)

router.get("/", protect, getTasks)
router.put("/:id", protect, updateTask)

module.exports = router
