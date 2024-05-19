'use strict';

const express = require('express');
const router = express.Router();
const FollowerController = require('../controllers/follower');

// Obtener los usuarios seguidos por un usuario por su nombre de usuario
router.get('/:username/followingPosts', FollowerController.getPostsByFollowingUser);
router.get('/:username/following',FollowerController.getFollowings);
router.get('/:username/followers',FollowerController.getFollowers);

module.exports = router;