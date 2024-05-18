'use strict'
var validator=require("validator")
var User=require("../models/user")

var controller={
    /**
     * Valida las credenciales del usuario e inicia sesión.
     * @param {*} req 
     * @param {*} res 
     */
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

    /**
     * Valida las credenciales del usuario e inicia sesión.
     * @param {*} req 
     * @param {*} res 
     */
    validateUser: async (req, res) => {
        const { name, password } = req.body;
        try {
            const user = await User.findOne({ name, password });

            if (!user) {
                return res.status(401).json({ message: 'Invalid credentials' });
            }

            res.status(200).json({ message: 'Login successful', user });
        } catch (error) {
            res.status(500).json({ message: 'Internal server error', error });
        }
    },


}
    


module.exports = controller;