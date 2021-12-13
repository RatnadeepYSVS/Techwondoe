const mongoose = require('mongoose') //An ODM which translates objects in code and document representation of data
const CompanySchema = mongoose.Schema({ //defining our company schema
    uniqeid: String, //uuid
    name: String, //companyname
    ceo: String, //ceo
    address: String, //location
    inceptiondate: String
})
module.exports = mongoose.model('Company', CompanySchema) //Exporting our Company model