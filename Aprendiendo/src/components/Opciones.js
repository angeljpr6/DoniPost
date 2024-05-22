import React, { Component } from 'react';
import axios from 'axios';

import Header from './Header';
import BarraLateral from './BarraLateral';
import { getUser } from '../Recursos/UserLogin';

/**
 * Muestra el apartado de opciones donde el usuario puede cambiar algun dato de su perfil
 */
class Opciones extends Component {
    state = {
        nuevaContrasena: '', 
        contrasenaActual: '', 
        status: null,
        contrasenaActualizada: false,
        errorContrasena: false
    };

    /**
     * Si la contraseña actual es correcta
     * cambia la contraseña del usuario en la base de datos
     */
    handleChangePassword = async () => {
        const { nuevaContrasena, contrasenaActual } = this.state;
        const username = getUser(); 

        try {
            const response = await axios.post('http://localhost:3900/api/validatepassword', { username, password: contrasenaActual });

            if (response.status === 200) {
                const responseUpdate = await axios.post('http://localhost:3900/api/changepassword', { username, newPassword: nuevaContrasena });

                if (responseUpdate.status === 200) {
                    console.log('Contraseña actualizada correctamente');
                    this.setState({ 
                        contrasenaActualizada: true,
                        errorContrasena: false 
                    });
                }
            }
        } catch (error) {
            console.error('Error al cambiar la contraseña:', error);
            this.setState({ errorContrasena: true, contrasenaActualizada: false });
        }
    };

    /**
     * Cambia el valor de nuevaContrasena al escribir en su textArea
     * @param {*} e 
     */
    handleInputChange = (e) => {
        this.setState({ nuevaContrasena: e.target.value });
    };

    /**
     * Cambia el valor de contrasenaActual al escribir en su textArea
     * @param {*} e 
     */
    handleCurrentPasswordChange = (e) => {
        this.setState({ contrasenaActual: e.target.value });
    };

    render() {
        const { contrasenaActualizada, errorContrasena } = this.state;

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
                                onChange={this.handleCurrentPasswordChange}
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="newPassword">Nueva Contraseña:</label>
                            <input
                                type="password"
                                id="newPassword"
                                placeholder="Nueva contraseña"
                                onChange={this.handleInputChange}
                            />
                        </div>
                        <button className="btn" onClick={this.handleChangePassword}>Cambiar Contraseña</button>
                        {contrasenaActualizada && <p>¡La contraseña se ha actualizado!</p>}
                        {errorContrasena && <p id='errorCont'>Error al cambiar la contraseña</p>}
                    </div>
                </div>
            </div>
        );
    }
}

export default Opciones;
