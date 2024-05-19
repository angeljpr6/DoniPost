import { Component } from "react";
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';

import Perfil from "./components/Perfil";
import Inicio from "./components/Inicio";
import LoginForm from "./components/LoginForm";
import SearchResults from "./components/SearchResults"; // Importa el componente de resultados de búsqueda
import PerfilUsers from "./components/PerfilUsers";

class Router extends Component {
    render() {
        return (
            <BrowserRouter>
                {/* RUTAS Y PAGINAS */}
                <Routes>
                    <Route path="/" element={<Navigate to="/login" />} />
                    <Route path="/login" element={<LoginForm />} />
                    <Route path="/Inicio" element={<Inicio />} />
                    <Route path="/Perfil" element={<Perfil />} />
                    <Route path="/Perfil/user" element={<PerfilUsers />} />
                    <Route path="/perfiles/busqueda/:search" element={<SearchResults />} /> {/* Ruta corregida */}
                </Routes>
            </BrowserRouter>
        );
    }
}

export default Router;


