const company = require('../models/company') //getting our company collections
const team = require('../models/team') //getting our team collections
const { uuid } = require('uuidv4') //package used for generating uuid
    //call for getting all the companies 
exports.companies = async(req, res) => {
        const companies = await company.find() //getting all companies 
        res.status(200).json({ 'msg': companies })
    }
    //call for finding the company by specifying the id
exports.findCompany = async(req, res) => {
        const id = req.params.id //accessing the id provieded by user
        const Company = await company.findById(id) // fetching the company details with the id provided by user
        res.status(200).json({ 'msg': Company }) //returning the company details
    }
    //call for creating a company
exports.createCompany = async(req, res) => {
        const { body } = req // destructuring body from req
        const { name } = body // destructuring company name from body
        const companyName = await company.findOne({ name }) // checking whether company exists or not
        if (companyName) return res.status(403).json({ 'msg': 'Company Exists' }) //returning a response of 403 to user that company with that name is already present
        const companyy = await company.create({...body, uniqeid: uuid() }) //creating the company details
        res.status(201).json({
                "msg": "Company Created",
                "Company": companyy
            }) //returning success response to user 
    }
    //call for updating the company details which has already created
exports.updateCompany = async(req, res) => {
        const { body } = req // destructuring body from req
        const { name } = body // destructuring company name from body
        const { id } = req.params // fetching the id of company provided by user
        const companyName = await company.findOne({ name }) //checking whether company exists or not
        if (!companyName) return res.status(404).json({ 'msg': 'Company Not Exists' }) //returning a response of 404 that the company provided by user is not there
        const companyy = await company.findByIdAndUpdate(id, {...body }, { new: true, runValidators: true }) //updating company details
        res.status(201).json({
                "msg": "Company Updated",
                "Company": companyy
            }) //returning success response to user
    } // call for deleting the company details which was created already
exports.deleteCompany = async(req, res) => {
        const { body } = req // destructuring body from req
        const { name } = body // destructuring company name from body
        const id = req.params.id // fetching the id of company provided by user
        const companyName = await company.findOne({ name }) //checking whether company exists or not
        if (!companyName) return res.status(404).json({ 'msg': 'Company Not Exists' }) //returning a response of 404 that the company provided by user is not there
        const companyy = await company.findByIdAndDelete(id) //deleting company details
        res.status(201).json({
                "msg": "Company deleted",
                "Company": companyy
            }) //returning success response to user
    } // call for creating team for a company provided by user
exports.createTeam = async(req, res) => {
        const { body } = req // destructuring body from req
        const id = req.params.id //fetching the id of the company
        const Teamy = await team.create({...body, companyy: id, uniqeid: uuid() }) //creating a team
        res.status(201).json({
                "msg": "Team Created",
                "Team": Teamy
            }) //returning success response to user
    } //call for getting all the teams that company has which was provided by user
exports.teams = async(req, res) => {
        const companyName = req.params.company //getting the company name from user
        const office = await company.findOne({ name: companyName }) //fetching details of company provided by user
        const teams = await team.find({ companyy: office.id }) //getting the teams that based on company id
        res.status(200).json({ 'teams': teams }) // getting details of the teams 
    } //call for searching the companies by user
exports.searchCompanies = async(req, res) => {
    const searchVal = req.params.val //search keyword entered by user
    const companies = await company.find() // fetching all companies
    const searchResults = companies.filter(i => i.name.toLowerCase().indexOf(searchVal) != -1)
        //the thing happening in above line is we are using filter to filter our results based on company name by checking whether the entered string or letter entered by user is there or not 
    res.status(200).json({ msg: searchResults }) //fetching the search results
}