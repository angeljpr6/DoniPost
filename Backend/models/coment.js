'use strict'

var mongoose= require('mongoose');
var Schema=mongoose.Schema;

var ComentSchema= Schema({
    user: String,
    text: String,
    date : {type: Date, default: Date.now},
    idPost: String
});


module.exports= mongoose.model('Coment',ComentSchema);