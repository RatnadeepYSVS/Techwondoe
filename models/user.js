const mongoose = require('mongoose') //An ODM which translates objects in code and document representation of data
const UserSchema = mongoose.Schema({ //defining our user schema
    name: String, //name of user
    email: String, //email of user
    password: String //passcode
})
module.exports = mongoose.model('User', UserSchema) //exporting our user model