const authRouter = require("express").Router()
const authContorller = require("../controllers/auth.controller")

authRouter.post("/register", authContorller.userRegister)
authRouter.post("/login", authContorller.userLogin)

module.exports = authRouter
