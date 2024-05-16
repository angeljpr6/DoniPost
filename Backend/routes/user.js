'use strict'

var express=require('express');
var UserController= require("../controllers/user")
var router=express.Router();


//rutas

 router.get("/getusers",UserController.getUser)
 router.get("/tests",UserController.cosas)




module.exports=router;