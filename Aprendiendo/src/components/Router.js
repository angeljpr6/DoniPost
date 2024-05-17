import { Component } from "react";
import { BrowserRouter, Route, Switch} from 'react-router-dom';

import Perfil from "./Perfil";

class Router extends Component{

    render(){
        return (

            <BrowserRouter>

                 {/* RUTAS Y PAGINAS */}
                <Switch>
                        <Route path = "/Perfil" Component={Perfil}/>
                </Switch>

            </BrowserRouter>
        );
    }
}