const User = require("../models/user.model")
const jwt = require("jsonwebtoken")

const generateToken = (user) => {
  return jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, {
    expiresIn: "1d",
  })
}

exports.register = async (req, res) => {
  try {
    const { name, email, password, role } = req.body
    const userExists = await User.findOne({ email })
    if (userExists)
      return res.status(400).json({ message: "User already exists" })

    const user = await User.create({ name, email, password, role })
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      token: generateToken(user),
    })
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body
    const user = await User.findOne({ email })
    if (!user || !(await user.matchPassword(password))) {
      return res.status(401).json({ message: "Invalid credentials" })
    }

    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      token: generateToken(user),
    })
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}

exports.users = async (req, res) => {
  try {
    const users = await User.find()
    if (!users || users.length === 0) {
      return res.status(401).json({ message: "No users found" })
    }

    res.json({ users })
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}
