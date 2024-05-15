'use strict'

var mongoose= require('mongoose');
var Schema=mongoose.Schema;

var PostSchema= Schema({
    user: String,
    text: String,
    date : {type: Date, default: Date.now}
});

PostSchema.statics.findByUser = function(user, callback) {
    return this.find({ user: user }, callback);
};

module.exports= mongoose.model('Post',PostSchema);
