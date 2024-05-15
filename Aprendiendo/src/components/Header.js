import logo from '../assets/images/logo.svg';

const { Component } = require("react");


class Header extends Component {

    render() {

        return (
            <header id="header">
                <div className="center">
                    {/* LOGO */}
                    <div id="logo">
                        <img src={logo} className="app-logo" alt="Logotipo" />
                        <span id="brand">
                            <strong>Doni</strong>Post
                        </span>
                    </div>

                    {/* Menu */}
                    <nav id="menu">
                        <ul>
                            <li>
                                <a href="index.html">Inicio</a>
                            </li>
                            <li>
                                <a href="blog.html">Blog</a>
                            </li>
                            <li>
                                <a href="formulario.html">Formulario</a>
                            </li>
                            <li>
                                <a href="#">Pagina 1</a>
                            </li>
                            <li>
                                <a href="#">Pagina 2</a>
                            </li>
                        </ul>
                    </nav>

                    {/* LIMPIAR FLOTADOS */}
                    <div className="clearfix"></div>
                </div>
            </header>
        )
    }
}

export default Header;