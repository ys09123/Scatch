const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const { generateToken } = require("../utils/generateToken")
const userModel = require("../models/userModel")

module.exports.registerUser = (req, res) => {
  try {
    let { email, password, fullName } = req.body

    bcrypt.genSalt(10, (err, salt) => {
      bcrypt.hash(password, salt, async (err, hash) => {
        if(err) return res.send(err.message)
        else {
          let user = await userModel.create({
            email,
            password: hash,
            fullName,
          })
          let token = generateToken(user)
          res.cookie("token", token)
          res.send("User created successfully.")
        }
      })
    })
  } catch(err) {
    console.log(err.message)
  }
}