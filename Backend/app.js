'use strict'

//Cargar modulos de node para crear servidor
var express=require('express');
var bodyParser= require('body-parser');

//Ejecutar express(http)

var app=express()

//Cargar ficheros rutas
var post_routes=require("../Backend/routes/post")
var user_routes=require("../Backend/routes/user")
var follower_routes=require("../Backend/routes/follower")
var coment_routes=require("../Backend/routes/coment")

//Middlewares
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());
//CORS

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
    next();
});


//Añadir prefijos a rutas
app.use("/api",post_routes)
app.use("/api",user_routes)
app.use("/api",follower_routes)
app.use("/api", coment_routes)

//Exportar modulo
module.exports=app;