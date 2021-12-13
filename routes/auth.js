const router = require('express').Router() //creating our router object
const authcontrollers = require('../controllers/auth') //fetching our authentication controllers 
router.post('/signup', authcontrollers.signup) //this route allows the user to signup
router.post('/signin', authcontrollers.signin) // this route allows the user to signin
module.exports = router