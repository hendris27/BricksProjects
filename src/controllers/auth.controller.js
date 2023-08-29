const { User } = require("../models")
const argon = require("argon2")
const jwt = require("jsonwebtoken")
const errorHandler = require("../helpers/errorHandler.helper")
const { APP_SECRET } = process.env
module.exports = {
  userRegister: async (req, res) => {
    try {
      const { firstName, lastName, email } = req.body

      const checkDuplicate = await User.findOne({
        where: {
          email
        }
      })

      if (checkDuplicate) {
        throw Error("duplicate_email")
      }

      const password = await argon.hash(req.body.password)
      const userData = {
        firstName,
        lastName,
        email,
        password
      }
      const data = await User.create(userData)
      const results = {
        id: data.id,
        email: data.email,
        firstName: data.firstName,
        lastName: data.lastName
      }
      res.json({
        success: true,
        message: "User Created",
        results
      })
    } catch (error) {
      return errorHandler(res, error)
    }
  },
  userLogin: async (req, res) => {
    try {
      const { email, password } = req.body
      const findUser = await User.findOne({
        where: {
          email
        }
      })
      if (!findUser) {
        throw Error("user_not_found")
      }

      const verify = await argon.verify(findUser.password, password)
      if (!verify) {
        throw Error("wrong_credentials")
      }

      const token = jwt.sign(
        {
          id: findUser.id
        },
        APP_SECRET
      )

      return res.json({
        success: true,
        message: "Login Successfully",
        results: { token }
      })
    } catch (error) {
      return errorHandler(res, error)
    }
  }
}
