require("dotenv").config()
const express = require("express")
const cors = require("cors")
const authRoutes = require("./routes/auth.routes")
const taskRoutes = require("./routes/task.routes")
const connectDB = require("./config/db")

const app = express()

app.use(cors())
app.use(express.json())

app.use("/api/auth", authRoutes)
app.use("/api/tasks", taskRoutes)

const PORT = process.env.PORT || 8000

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
  })
})
