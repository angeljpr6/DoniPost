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

}
    


module.exports = controller;