'use strict';

const express = require('express');
const router = express.Router();
const FollowerController = require('../controllers/follower');

//Rutas
router.get('/:username/followingPosts', FollowerController.getPostsByFollowingUser);
router.get('/:username/following',FollowerController.getFollowings);
router.get('/:username/followers',FollowerController.getFollowers);
router.post("/follow",FollowerController.seguir);
router.post("/unfollow",FollowerController.dejarDeSeguir)
router.get("/allFollowers",FollowerController.getAllFollowers)


module.exports = router;