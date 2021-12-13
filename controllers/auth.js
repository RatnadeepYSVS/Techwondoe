const users = require('../models/user') //fetching our user collection
const bcrypt = require('bcryptjs') // module used to hash user passcodes
const jwt = require('jsonwebtoken') // module used to create auth tokens
exports.signin = async(req, res) => {
    const { body } = req // destructuring body from req
    const { email, password } = body //destructuring email and passcode from body object
    const user = await users.findOne({ email }) // checking whether user exists or not
    if (!user) return res.status(404).json({ "msg": "No user with that email" }) // sending a 404 status code as a response signaling that user doesen't exist
    const passcode = user.password //getting the passcode which user has entered to validate 
    const valid = await bcrypt.compare(password, passcode) //validating the password which user has entered with the one present in db
    if (!valid) return res.status(403).json({ "msg": "Wrong Password" }) //returning a response of 403 that user has entered wrong passcode
    const token = await jwt.sign({ email }, process.env.secret) //generating a token
    return res.status(201).json({ "msg": `Welcome ${user.name}`, "Token": token }) //returning success response that user has cleared validation
}
exports.signup = async(req, res) => {
    const { body } = req // destructuring body from req
    const { email, password } = body //destructuring email and passcode from body object
    const user = await users.findOne({ email }) // checking whether user exists or not
    if (user) return res.status(403).json({ "msg": "User With Email Exists" }) // sending a 403 status code as a response signaling that user exists with that email
    const passcode = await bcrypt.hash(password, 8) //hashing the passcode which user has entered
    const userr = await users.create({...body, password: passcode }) //creating the user
    const token = await jwt.sign({ email }, process.env.secret) //generating a token
    return res.status(201).json({ "msg": `Welcome ${body.name}`, res: userr, tok: token }) //returning success response that user has successfully signed up
}