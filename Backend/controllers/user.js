'use strict'
var validator=require("validator")
var User=require("../models/user")

var controller={
    cosas: function(req,res){
        return res.status(200).send({
            texto: "Bona tarda",
            usuario: 53534,
        
        })
    },

    

    getUser: (req, res) => {
        User.find({})
            .exec()
            .then(users => {
                if (!users || users.length === 0) {
                    return res.status(404).send({
                        message: "No hay artículos"
                    });
                }
                return res.status(200).send({
                    users
                });
            })
            .catch(err => {
                console.error(err);
                return res.status(500).send({
                    message: "Error al obtener los artículos"
                });
            });
    },


}
    


module.exports = controller;