import { Component } from "react";


/**
 * Este componente muestra una barra lateral con la que puedes navegar por la aplicacion
 */
class BarraLateral extends Component {
    render() {
        return (
            <div id="barraLat">
                <a href="/Inicio">
                    <h2>Inicio</h2>
                </a>
                <a href="/Perfil">
                    <h2>Perfil</h2>
                </a>
                <a href="/Opciones">
                    <h2>Opciones</h2>
                </a>
            </div>
        )
    }
}

export default BarraLateral;

