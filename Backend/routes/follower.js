'use strict';

const express = require('express');
const router = express.Router();
const FollowerController = require('../controllers/follower');

// Obtener los usuarios seguidos por un usuario por su nombre de usuario
router.get('/:username/following', FollowerController.getPostsByFollowingUser);

module.exports = router;