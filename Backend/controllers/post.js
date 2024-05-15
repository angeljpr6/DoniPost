'use strict'
var validator=require("validator")
var Post=require("../models/post")

var controller={
    cosas: function(req,res){
        return res.status(200).send({
            texto: "Buenas tardes",
            usuario: 53534,
        
        })
    },

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

    getPosts: (req, res) => {
        Post.find({})
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

    getPostByUser:(req,res)=> {
        var postUser=req.params.user
        if(!postUser|| postUser==null){
            return res.status(404).send({
                message: "datos vacios"
            });
        }
        Post.findByUser(postUser, (err,post)=>{
            if(err){
                return res.status(500).send({
                    message: "error"
                });
            } else if(!post){
                return res.status(404).send({
                    message: "No hay posts"
                });
            }else{
                return res.status(200).send({
                    post
                });
            }

        })
    }

}
    


module.exports = controller;