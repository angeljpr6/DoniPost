'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const FollowerSchema = new Schema({
    follower: String, // Nombre del usuario que sigue
    following: String
});

module.exports = mongoose.model('Follower', FollowerSchema);