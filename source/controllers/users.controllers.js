const {index,write} = require('../models/users.model');
const { validationResult } = require("express-validator");
const {hashSync} = require("bcrypt")
module.exports = {
    login: (req,res) => res.render('users/login'),
    register: (req,res) => res.render('users/register'),
    profile: (req,res) => res.render('users/profile'),
    save: (req,res) => {
        // control de las validaciones 
        const result = validationResult(req)
        if(!result.isEmpty()) {
            let errores = result.mapped();
            return res.render("users/register",{ 
                style: "register",
                errores: errores,
                data: req.body
            })
        }
        // si pasamos las validaciones
        let all = index();
        req.body.avatar = req.files && req.files[0] ? req.files[0].filename : null
        req.body.id = all.length > 0 ? index().pop().id + 1 : 1
        req.body.password = hashSync(req.body.password,10)
        let user = {...req.body};
        all.push(user)
        write(all)
        return res.redirect('/users/login')
    },
    access : (req,res) => {
        const result = validationResult(req)
        if(!result.isEmpty()) {
            let errores = result.mapped();
            return res.render("users/login",{ 
                style: "login",
                errores: errores,
                data: req.body
            })
        }
        res.cookie("user", req.body.email, {maxAge: 1000 * 60 * 3 })
        let all = index()
        req.session.user = all.find(user => user.email == req.body.email)
        return res.redirect("/")

    },
    logout : (req,res) => {
        delete req.session.user
        res.cookie("user", null, {maxAge: -1})
        res.redirect("/")
    }
}