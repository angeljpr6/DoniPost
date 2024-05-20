import React, { Component } from 'react';
import axios from 'axios';

import Header from './Header';
import BarraLateral from './BarraLateral';
import { getUser } from '../Recursos/UserLogin';

class Opciones extends Component {
    state = {
        nuevaContraseña: '', // Inicializamos nuevaContraseña con una cadena vacía
        contraseñaActual: '', // Inicializamos contraseñaActual con una cadena vacía
        status: null,
        contraseñaActualizada: false // Nuevo estado para controlar si la contraseña se ha actualizado con éxito
    };

    handleChangePassword = async () => {
        const { nuevaContraseña, contraseñaActual } = this.state;
        const username = getUser(); // Suponiendo que getUser() devuelve el nombre de usuario actual

        try {
            // Validar la contraseña actual primero antes de realizar la actualización
            const response = await axios.post('http://localhost:3900/api/validatepassword', { username, password: contraseñaActual });

            if (response.status === 200) {
                // Contraseña actual correcta, proceder con la actualización
                const responseUpdate = await axios.post('http://localhost:3900/api/changepassword', { username, newPassword: nuevaContraseña });

                if (responseUpdate.status === 200) {
                    // Contraseña actualizada exitosamente
                    console.log('Contraseña actualizada correctamente');
                    // Actualizar el estado para mostrar el mensaje de éxito
                    this.setState({ contraseñaActualizada: true });
                }
            } else {
                // Contraseña actual incorrecta
                console.log('La contraseña actual es incorrecta');
            }
        } catch (error) {
            console.error('Error al cambiar la contraseña:', error);
            // Manejar el error
        }
    };

    handleInputChange = (e) => {
        // Actualizar el estado con el valor del campo de nuevaContraseña
        this.setState({ nuevaContraseña: e.target.value });
    };

    handleCurrentPasswordChange = (e) => {
        // Actualizar el estado con el valor del campo de contraseña actual
        this.setState({ contraseñaActual: e.target.value });
    };

    render() {
        const { contraseñaActualizada } = this.state; // Obtener el estado de contraseñaActualizada

        return (
            <div>
                <Header />
                <BarraLateral />
                <div id="contenido">
                    <div id="opcionesContent">
                        <h2>Opciones</h2>
                        <div className="form-group">
                            <label htmlFor="currentPassword">Contraseña Actual:</label>
                            <input
                                type="password"
                                id="currentPassword"
                                placeholder="Contraseña actual"
                                onChange={this.handleCurrentPasswordChange} // Llamar a handleCurrentPasswordChange cuando cambie el valor del campo
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="newPassword">Nueva Contraseña:</label>
                            <input

                                type="password"
                                id="newPassword"
                                placeholder="Nueva contraseña"
                                onChange={this.handleInputChange} // Llamar a handleInputChange cuando cambie el valor del campo
                            />
                        </div>
                        <button className="btn" onClick={this.handleChangePassword}>Cambiar Contraseña</button>
                        {contraseñaActualizada && <p>¡La contraseña se ha actualizado!</p>} {/* Mostrar el mensaje de éxito si la contraseña se actualizó */}
                    </div>
                </div>
            </div>
        );
    }
}

export default Opciones;
