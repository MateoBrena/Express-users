const {body} = require("express-validator");

let email = body("email").notEmpty().withMessage("Email no puede quedar vacío").bail().isEmail().withMessage("Email no válido")
let password = body("password").notEmpty().withMessage("Contraseña no válida").bail().isLength({min:4}).withMessage("Mínimo 4 caraceteres")

let validaciones = [email,password]

module.exports = validaciones;