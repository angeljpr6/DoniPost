'use strict'

var mongoose= require('mongoose');
var Schema=mongoose.Schema;

var UserSchema= Schema({
    name: String,
    password: String,
    biography: String
    
});


module.exports= mongoose.model('User',UserSchema);