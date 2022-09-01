const {resolve} = require('path');
const {port,start} = require('./modules/server');
const express = require('express');
const session = require("express-session")
const cookie = require("cookie-parser")
const app = express();

app.listen(port, start());
app.set ('views', resolve(__dirname, 'views'));
app.set("view engine", "ejs");
app.use(express.static(resolve(__dirname,'..','public')))
app.use(express.urlencoded({extended:true}))
app.use(require("./middlewares/style"))

app.use(session({
    secret: "express-users",
    resave: true,
    saveUninitialized: true
})) // Adds to request property session // req.session

app.use(cookie()) // Adds to request the property cookies // Adds to response the method cookie()

app.use(require("./middlewares/user"))

app.use(require("./routes/main.routes"))
app.use('/users',require('./routes/users.routes'))

/* 
1. paquetes en el app
2. session en app y el cookie parser
3. validación de login usando express validator
4. requerir validaciones en rutas
5.  metodo access -> tira errores y sino crea cookie de usuario
6. middleware global -> user js
7. validaciones en vista de login
8. mensaje welcome usuario logrado
 */
