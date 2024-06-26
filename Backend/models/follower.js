'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const FollowerSchema = new Schema({
    follower: String, 
    following: String
});

module.exports = mongoose.model('Follower', FollowerSchema);