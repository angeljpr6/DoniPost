import React, { Component } from 'react';

import Header from './Header';
import BarraLateral from './BarraLateral';

class Opciones extends Component {
    render() {
        return (
            <div>
                <Header />
                <BarraLateral />
                <div id="opcionesContent">
                    <h3>Opciones</h3>
                    <form>
                        <div className="form-group">
                            <label htmlFor="username">Cambiar nombre de usuario:</label>
                            <input type="text" id="username" name="username" placeholder="Nuevo nombre de usuario" />
                        </div>
                        <div className="form-group">
                            <label htmlFor="password">Cambiar contraseña:</label>
                            <input type="password" id="password" name="password" placeholder="Nueva contraseña" />
                        </div>
                        <div className="form-group">
                            <button type="submit" className="btn">Cambiar</button>
                        </div>
                    </form>
                    <button className="btn btn-danger">Eliminar cuenta</button>
                </div>
            </div>
        );
    }
}

export default Opciones;