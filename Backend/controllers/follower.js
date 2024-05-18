'use strict';

var Post = require('../models/post');
var Follower = require('../models/follower');

var controller = {
    // Método para obtener los posts de los usuarios seguidos por un usuario específico
    getPostsByFollowingUser: async (req, res) => {
        try {
            const username = req.params.username; // Nombre de usuario del cual se desea obtener los posts

            // Buscar los nombres de usuario de los usuarios seguidos por el usuario especificado
            const following = await Follower.find({ follower: username }).select('following');
            const followingUsernames = following.map(follow => follow.following);

            // Buscar todos los posts cuyo autor esté en el array de nombres de usuario de los usuarios seguidos
            const posts = await Post.find({ user: { $in: followingUsernames } });

            return res.status(200).send({ posts });
        } catch (error) {
            console.error(error);
            return res.status(500).send({ message: 'Error al obtener los posts de los usuarios seguidos' });
        }
    },

    getFollowings: async (req, res) => {
        try {
            const username = req.params.username; // Nombre de usuario del cual se desea obtener los posts

            // Buscar los nombres de usuario de los usuarios seguidos por el usuario especificado
            const following = await Follower.find({ follower: username }).select('following');



            return res.status(200).send({following});
        } catch (error) {
            console.error(error);
            return res.status(500).send({ message: 'Error al obtener los posts de los usuarios seguidos' });
        }
    },


    // Otros métodos del controlador de posts...
};

module.exports = controller;