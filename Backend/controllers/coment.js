'use strict'
var validator=require("validator")
var Coment=require("../models/coment")

var controller={
    
    getComents: (req, res) => {
        Coment.find({})
            .sort({ date: -1 }) 
            .exec()
            .then(coments => {
                if (!coments || coments.length === 0) {
                    return res.status(404).send({
                        message: "No hay artículos"
                    });
                }
                return res.status(200).send({
                    coments
                });
            })
            .catch(err => {
                console.error(err);
                return res.status(500).send({
                    message: "Error al obtener los artículos"
                });
            });
    },

    getComentsByPostId: (req, res) => {
        // Extraer el ID del post de los parámetros de la solicitud
        const postId = req.params.idPost;

        // Realizar la consulta a la base de datos para encontrar comentarios con el ID del post especificado
        Coment.find({ idPost: postId })
            .sort({ date: -1 })
            .exec()
            .then(coments => {
                if (!coments || coments.length === 0) {
                    return res.status(404).send({
                        message: 'No se encontraron comentarios para este post'
                    });
                }
                return res.status(200).send({
                    coments
                });
            })
            .catch(err => {
                console.error(err);
                return res.status(500).send({
                    message: 'Error al obtener los comentarios'
                });
            });
    },

    postComent: async (req, res) => {
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
            var coment = new Coment({
                user: params.user,
                text: params.text,
                idPost: params.idPost
            });
    
            // Guardar en la base de datos
            const comentStored = await coment.save();
    
            if (!comentStored) {
                throw new Error('El post no se guardó correctamente.');
            }
    
            return res.status(200).send({
                coment: comentStored
            });
        } catch (err) {
            console.error(err);
            return res.status(500).send({
                message: 'Error al guardar el post en la base de datos.'
            });
        }
    },


}
    


module.exports = controller;