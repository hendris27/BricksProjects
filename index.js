require("dotenv").config({
  path: ".env"
})

const express = require("express")
const cors = require("cors")

const app = express()

app.get("/", (request, response) => {
  return response.json({
    succes: true,
    message: "Backend is running well"
  })
})

app.use(express.urlencoded({ extended: false }))
app.use(express.json())
app.use(cors())

app.use("/uploads", express.static("uploads"))
app.use("/", require("./src/routes"))

const PORT = process.env.PORT
app.listen(PORT, () => {
  console.log(`Aplikasi running on port ${PORT}`)
})
