const {Router} = require('express');
const router = Router();
const { login,register,profile,save, access, logout} = require('../controllers/users.controllers');
const multer = require('multer');
const storage = require('../modules/storage');
const upload = multer({storage:storage('../../uploads/users')});
const validaciones = require("../validations/register")
const validatorLogin = require("../validations/login")
const isLogged = require("../middlewares/isLogged")

router.get('/login', login)
router.get('/register', register)
router.get('/profile',[isLogged], profile)
router.get('/logout', logout)

router.post('/save',upload.any(),validaciones,save)
router.post("/access", validatorLogin ,access)
module.exports = router