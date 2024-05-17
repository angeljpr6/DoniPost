import { Component } from "react";
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import Perfil from "./components/Perfil";
import Inicio from "./components/Inicio";

class Router extends Component {

    render() {
        return (
            <BrowserRouter>
                {/* RUTAS Y PAGINAS */}
                <Routes>
                    <Route path="/Inicio" element={<Inicio />} />
                    <Route path="/Perfil" element={<Perfil />} />
                </Routes>
            </BrowserRouter>
        );
    }
}

export default Router;
