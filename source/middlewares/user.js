const { index } = require("../models/users.model")

let middleware = (req,res,next) => {
    let user =  null
    // Step 1: cookie from user exists
    if(req.cookies && req.cookies.user){
        let users = index()
        let result = users.find(user => user.email == req.cookies.user)
        req.cookies.user = result
    }
    // Step 2: user in session exists
    if(req.session && req.session.user){
            user = req.session.user
    }

    res.locals.user = user
    return next()
}

module.exports = middleware