'use strict'
var validator = require("validator")
var User = require("../models/user")

var controller = {
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

    validatePassword: async (req, res) => {
        const { username, password } = req.body;
        try {
            const user = await User.findOne({ name: username, password: password });

            if (!user) {
                return res.status(401).json({ message: 'Contraseña actual incorrecta' });
            }

            res.status(200).json({ message: 'Contraseña actual correcta' });
        } catch (error) {
            res.status(500).json({ message: 'Error al validar la contraseña actual', error });
        }
    },

    changePassword: async (req, res) => {
        const { username, newPassword } = req.body;
        console.log(newPassword)
        try {
            const user = await User.findOneAndUpdate({ name: username }, { password: newPassword }, { new: true });

            if (!user) {
                return res.status(404).json({ message: 'Usuario no encontrado' });
            }

            res.status(200).json({ message: 'Contraseña actualizada exitosamente', user });
        } catch (error) {
            res.status(500).json({ message: 'Error interno del servidor', error });
        }
    },
    searchUsers: async (req, res) => {
        try {
            const { text } = req.params;
            const users = await User.find({ name: { $regex: text, $options: 'i' } });

            if (!users || users.length === 0) {
                return res.status(404).json({ message: 'No se encontraron usuarios' });
            }

            res.status(200).json({ users });
        } catch (error) {
            console.error('Error al buscar usuarios:', error);
            res.status(500).json({ message: 'Error interno del servidor' });
        }
    },
    getUserBio: async (req, res) => {
        try {
            const username = req.params.username;
            const user = await User.findOne({ name: username });
            if (!user) {
                return res.status(404).send({ message: 'Usuario no encontrado' });
            }
            res.status(200).send({ biography: user.biography });
        } catch (error) {
            res.status(500).send({ message: 'Error al obtener la biografía del usuario' });
        }
    },
    register: async (req, res) => {
        // Obtener parámetros
        var params = req.body;
    
        try {
            // Validar datos
            var validate_user = !validator.isEmpty(params.user);
            var validate_pass = !validator.isEmpty(params.password);
    
            if (!validate_user || !validate_pass) {
                return res.status(404).send({
                    message: "Faltan datos"
                });
            }
    
            // Crear objeto
            var user = new User({
                name: params.user,
                password: params.password,
                biography: params.bio
            });
    
            // Guardar en la base de datos
            const userStored = await user.save();
    
            if (!userStored) {
                throw new Error('El post no se guardó correctamente.');
            }
    
            return res.status(200).send({
                user: userStored
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