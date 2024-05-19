'use strict';
var validator=require("validator")
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
    
            // Buscar todos los posts cuyo autor esté en el array de nombres de usuario de los usuarios seguidos,
            // ordenados por fecha en orden descendente
            const posts = await Post.find({ user: { $in: followingUsernames } }).sort({ date: -1 });
    
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

    getFollowers: async (req, res) => {
        try {
            const username = req.params.username; // Nombre de usuario del cual se desea obtener los followers
    
            // Buscar los nombres de usuario que siguen al usuario especificado
            const followers = await Follower.find({ following: username }).select('follower');
    
            return res.status(200).send({ followers });
        } catch (error) {
            console.error(error);
            return res.status(500).send({ message: 'Error al obtener los seguidores del usuario' });
        }
    
    },

    seguir: async (req, res) => {
        var params = req.body;
    
        try {
            // Validar datos
            var validate_follower = !validator.isEmpty(params.follower);
            var validate_following = !validator.isEmpty(params.following);
    
            if (!validate_follower || !validate_following) {
                return res.status(400).send({
                    message: "Faltan datos por enviar"
                });
            }
    
            // Crear objeto
            var follower = new Follower({
                follower: params.follower,
                following: params.following
            });
    
            // Guardar en la base de datos
            const followerStored = await follower.save();
    
            if (!followerStored) {
                throw new Error('El seguimiento no se guardó correctamente.');
            }
    
            return res.status(200).send({
                follower: followerStored
            });
        } catch (err) {
            console.error(err);
            return res.status(500).send({
                message: 'Error al guardar el seguimiento en la base de datos.'
            });
        }
    },

    dejarDeSeguir: async (req, res) => {
        var params = req.body;
        console.log(req);
    
        try {
            // Validar datos
            var validate_follower = !validator.isEmpty(params.follower);
            var validate_following = !validator.isEmpty(params.following);
    
            if (!validate_follower || !validate_following) {
                return res.status(400).send({
                    message: "Faltan datos por enviar"
                });
            }
    
            // Eliminar de la base de datos
            const followerDeleted = await Follower.findOneAndDelete({
                follower: params.follower,
                following: params.following
            });
    
            if (!followerDeleted) {
                return res.status(404).send({
                    message: "El seguimiento no existe o ya ha sido eliminado"
                });
            }
    
            return res.status(200).send({
                message: "El seguimiento ha sido eliminado correctamente",
                follower: followerDeleted
            });
        } catch (err) {
            console.error(err);
            return res.status(500).send({
                message: 'Error al eliminar el seguimiento en la base de datos.'
            });
        }
    },

    getAllFollowers: async (req, res) => {
        try {
            const allDocuments = await Follower.find({});
            return res.status(200).send({ followers: allDocuments });
        } catch (error) {
            console.error(error);
            return res.status(500).send({ message: 'Error al obtener todos los documentos de la colección' });
        }
    }



};

module.exports = controller;