'use strict'

var express=require('express');
var UserController= require("../controllers/user")
var router=express.Router();


//rutas

 router.get("/getusers",UserController.getUser)
 router.post("/login",UserController.validateUser)

module.exports=router;