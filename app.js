//The main file 
const dbcon = require('./db_connect') //database connection file
const express = require('express') // the package which is used to design api's with help of node.js
require('dotenv').config() // this package is used to access environment variables
const port = process.env.PORT || 3000 // setting the port
const app = express() //creating our express app
app.use(express.json()) //allowing express to use json
dbcon() // connecting to the database
app.use(require('./routes/auth')) // all the routes regarding the authentication
app.use(require('./routes/main')) //all the routes regarding teams and companies 
app.listen(port, () => console.log(`Server Running on PORT:-${port}`)) //making our server listen to a port