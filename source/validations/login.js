const {body} = require("express-validator");
const {index} = require("../models/users.model")
const {compareSync} = require("bcrypt")

let email = body("email").notEmpty().withMessage("Email no puede quedar vacío").bail().isEmail().withMessage("Email no válido").custom((value,{req}) => {
let users = index()
let lisOfEmails = users.map(user => user.email)
if(lisOfEmails.indexOf(value) == -1) {
    throw new Error("Usuario no encontrado")
}
return true
})

let password = body("password").notEmpty().withMessage("Contraseña no válida").bail().isLength({min:4}).withMessage("Mínimo 4 caraceteres").custom((value,{req}) => {
    let users = index()
    let result = users.find(user => user.email == req.body.email)
    if(!result) {
        throw new Error("Credenciales inválidas")
    }
    if (!compareSync(value,result.password)) {
        throw new Error("La contraseña no coincide")
    }
    return true
    })

let validaciones = [email,password]

module.exports = validaciones;