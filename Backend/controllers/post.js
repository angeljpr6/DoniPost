'use strict'
var validator=require("validator")
var Post=require("../models/post")

var controller={
    
    /**
     * Método para crear post
     * @param {*} req 
     * @param {*} res 
     * @returns 
     */
    save: async (req, res) => {
        // Obtener parámetros
        var params = req.body;
    
        try {
            // Validar datos
            var validate_user = !validator.isEmpty(params.user);
            var validate_text = !validator.isEmpty(params.text);
    
            if (!validate_user || !validate_text) {
                return res.status(404).send({
                    message: "No hay artículos"
                });
            }
    
            // Crear objeto
            var post = new Post({
                user: params.user,
                text: params.text
            });
    
            // Guardar en la base de datos
            const postStored = await post.save();
    
            if (!postStored) {
                throw new Error('El post no se guardó correctamente.');
            }
    
            return res.status(200).send({
                post: postStored
            });
        } catch (err) {
            console.error(err);
            return res.status(500).send({
                message: 'Error al guardar el post en la base de datos.'
            });
        }
    },
    /**
     * Método para obetenr posts
     * @param {*} req 
     * @param {*} res 
     */
    getPosts: (req, res) => {
        Post.find({})
            .sort({ date: -1 }) 
            .exec()
            .then(posts => {
                if (!posts || posts.length === 0) {
                    return res.status(404).send({
                        message: "No hay artículos"
                    });
                }
                return res.status(200).send({
                    posts
                });
            })
            .catch(err => {
                console.error(err);
                return res.status(500).send({
                    message: "Error al obtener los artículos"
                });
            });
    },
    /**
     * Método para obetenr posts por usuario
     * @param {*} req 
     * @param {*} res 
     * @returns 
     */
    getPostByUser: (req, res) => {
        const postUser = req.params.user;
    
        if (!postUser || postUser == null) {
            return res.status(404).send({
                message: "Datos vacíos"
            });
        }
    
        Post.findByUser(postUser)
            .sort({ date: -1 }) 
            .exec((err, post) => {
                if (err) {
                    return res.status(500).send({
                        message: "Error"
                    });
                } else if (!post) {
                    return res.status(404).send({
                        message: "No hay posts"
                    });
                } else {
                    return res.status(200).send({
                        post
                    });
                }
            });
    },
    
    /**
     * Método para eliminar post por id
     * @param {*} req 
     * @param {*} res 
     */
    deletePost: async (req, res) => {
        const postId = req.params.postId; 
        try {
            // Eliminar el post por su ID
            await Post.findByIdAndDelete(postId);
            res.status(200).json({ message: 'Post eliminado correctamente' });
        } catch (error) {
            console.error('Error al eliminar el post:', error);
            res.status(500).json({ message: 'Error interno del servidor al eliminar el post', error });
        }
    }

}
    


module.exports = controller;