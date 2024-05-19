import { Component } from "react";
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';

import Perfil from "./components/Perfil";
import Inicio from "./components/Inicio";
import LoginForm from "./components/LoginForm";
import SearchResults from "./components/SearchResults"; // Importa el componente de resultados de búsqueda
import PerfilUsers from "./components/PerfilUsers";
import Opciones from "./components/Opciones";
import Register from "./components/Register";

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
                    <Route path="/Opciones" element={<Opciones />} />
                    <Route path="/Register" element={<Register />} />
                    <Route path="/perfiles/busqueda/:search" element={<SearchResults />} /> 
                </Routes>
            </BrowserRouter>
        );
    }
}

export default Router;


