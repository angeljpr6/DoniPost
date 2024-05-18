import logo from '../assets/images/logo.svg';

const { Component } = require("react");


class Header extends Component {

    render() {

        return (
            <header id="header">
                <div className="center">
                    {/* LOGO */}
                    <div id="logo">
                        <a href="/Inicio" className="app-logo-link"> {/* Establece el href a "/" para redirigir al index.html */}
                            <img src={logo} className="app-logo" alt="Logotipo" />
                        </a>
                        
                    </div>
                    <div>
                        <span id="brand">
                            <strong>Doni</strong>Post
                        </span>
                    </div>

                    {/* BARRA DE BUSQUEDA */}
                    <div id="searchBar">
                        <input type="text" placeholder="Buscar..." />
                    </div>

                    {/* LIMPIAR FLOTADOS */}
                    <div className="clearfix"></div>
                </div>
            </header>
        )
    }
}

export default Header;