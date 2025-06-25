const express = require("express")
const router = express.Router()
const { login, register, users } = require("../controllers/auth.controller")
const protect = require("../middleware/auth.middleware")
const authorizeRoles = require("../middleware/role.middleware")

router.post("/register", register)
router.post("/login", login)
router.get("/users", protect, authorizeRoles("admin"), users)

module.exports = router
