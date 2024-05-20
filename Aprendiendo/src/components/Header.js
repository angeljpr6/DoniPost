import { Navigate } from 'react-router-dom';
import logo from '../assets/images/image-Photoroom.png-Photoroom (2).png';
import React, { Component } from 'react';

class Header extends Component {
    searchRef = React.createRef();

    state = {
        search: "",
        redirect: false
    }

    redirectToSearch = (e) => {
        e.preventDefault();

        this.setState({
            search: this.searchRef.current.value,
            redirect: true
        });
    }

    render() {
        if (this.state.redirect) {
            return (
                <Navigate to={'/perfiles/busqueda/' + this.state.search} />
            );
        }

        return (
            <header id="header">
                <div className="center">
                    {/* LOGO */}
                    <div id="logo">
                        <a href="/Inicio" className="app-logo-link">
                            <img src={logo} className="app-logo" alt="Logotipo" />
                        </a>
                    </div>

                    {/* BRAND */}
                    <div id="brand">
                        <strong>Doni</strong>Post
                    </div>

                    {/* BARRA DE BUSQUEDA */}
                    <div id="searchBar">
                        <form onSubmit={this.redirectToSearch}>
                            <input
                                type="text"
                                placeholder="Buscar..."
                                ref={this.searchRef}
                                onKeyPress={this.handleKeyPress}
                            />
                        </form>
                    </div>
                </div>
            </header>
        );
    }
}

export default Header;
