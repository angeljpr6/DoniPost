'use strict'
var validator=require("validator")
var User=require("../models/user")

var controller={
    

    

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


    validateUser: async (req, res) => {
        const { name, password } = req.body;

        try {
            // Busca el usuario en la base de datos
            const user = await User.findOne({ name, password });

            if (!user) {
                // Usuario o contraseña incorrectos
                return res.status(401).json({ message: 'Invalid credentials' });
            }

            // Usuario y contraseña correctos
            res.status(200).json({ message: 'Login successful', user });
        } catch (error) {
            res.status(500).json({ message: 'Internal server error', error });
        }
    }


}
    


module.exports = controller;