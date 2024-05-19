'use strict'

var express=require('express');
var PostController= require("../controllers/post")
var router=express.Router();

//ruta de prueba
router.get("/test",PostController.cosas)

//rutas
router.post("/save",PostController.save)
router.get("/get",PostController.getPosts)
router.get("/getuserposts/:user",PostController.getPostByUser)
router.delete("/posts/:postId", PostController.deletePost);


module.exports=router;