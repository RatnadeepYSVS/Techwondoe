const jwt = require('jsonwebtoken') //importing jwt
exports.authMiddleWare = async(req, res, next) => {
    if (!req.header('Authorization')) return res.status(403).json({ msg: "Not Authorized" }) //checking whether user has signed up or logged in if not returning a response of 403 to user cause of unauthorized access
    try {
        const valid = await jwt.verify(req.header('Authorization'), process.env.secret) //verifying the token with the secret
        if (!valid) return res.status(403).json({ "msg": "Error" }) //returning a response of 403 to user cause of validation error
    } catch (e) {
        return res.status(500).json({
                "msg": `Server Error ${e}`
            }) //returning a server error due to some error
    }
    next() //validated middleware and proceeds to main control call
}