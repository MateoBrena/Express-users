let middleware = (req,res,next) => {
    if (req.session && req.session.user) {
        next()
    }
    res.redirect("/users/login")
}


module.exports = middleware