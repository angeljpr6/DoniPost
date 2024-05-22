'use strict'

var express = require('express');
var UserController = require("../controllers/user")
var router = express.Router();


//rutas
router.get("/getusers", UserController.getUser)
router.post("/login", UserController.validateUser)
router.post("/changepassword", UserController.changePassword); // Nueva ruta para cambiar contraseña
router.post("/validatepassword", UserController.validatePassword); // Ruta para validar la contraseña actual
router.get('/searchusers/:text', UserController.searchUsers); // Nueva ruta para buscar usuarios por texto
router.get('/getuserbio/:username', UserController.getUserBio);
router.post('/register', UserController.register)



module.exports = router;