const { Component } = require("react");


class BarraLateral extends Component {
    
    render() {

        return (
            <div id="barraLat">
                <a href="/Inicio">
                    <h2>Inicio</h2>
                </a>
                <a href="/Perfil" >
                    <h2>Perfil</h2>
                </a>
                <a href="/Perfil">
                    <h2>Opciones</h2>
                </a>
                <a href="/Perfil">
                    <h2>Escribir Post</h2>
                </a>
            </div>
        )
    }
}

export default BarraLateral;