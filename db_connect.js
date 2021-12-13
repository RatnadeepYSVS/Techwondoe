const mongoose = require('mongoose') //An ODM which translates objects in code and document representation of data
const expo = () => {
    const uri = process.env.uri //accessing our mongodb connection uri from .env file
    mongoose.connect(uri, { useUnifiedTopology: true, useNewUrlParser: true }).then(() => console.log('DataBase Connected')).catch(e => console.log(`Database Error ${e}`)) //connecting to database
}
module.exports = expo //exporting to main file app.js