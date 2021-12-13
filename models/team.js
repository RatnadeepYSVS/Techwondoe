const mongoose = require('mongoose') //An ODM which translates objects in code and document representation of data
const TeamSchema = mongoose.Schema({ //defining our team schema
    uniqeid: String, //uuid
    name: String, //teamname
    teamlead: String, //teamleader
    companyy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Company'
    } //mapping to company with id
})
module.exports = mongoose.model('Team', TeamSchema) //exporting our team model