'use strict'

var express = require('express');
var ComentController = require("../controllers/coment")
var router = express.Router();


//rutas
router.get("/getcoments", ComentController.getComents);
router.get("/getcomentsByPostId/:idPost", ComentController.getComentsByPostId);
router.post("/postComent",ComentController.postComent)





module.exports = router;