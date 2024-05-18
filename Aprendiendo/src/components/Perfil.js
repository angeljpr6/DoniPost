import React, { Component } from "react";

import { getUser } from "../Recursos/UserLogin";
import PostUser from "./PostUser";
import Header from "./Header";
import BarraLateral from "./BarraLateral";
import { getBiography } from "../Recursos/UserLogin";
import { getFollowing } from "./UserData";
class Perfil extends Component{

    render(){
        const nombreUsuario = getUser()
        console.log(nombreUsuario)
        const bio = getBiography()
        const following = getFollowing("daniel")
        
        return(
            <div>
                <Header/>
                <BarraLateral/>
                <div id="contenido">
                    
                    <div id="perfil">
                        <div id="infoPerfil">
                            <h1>@{nombreUsuario}</h1>
                            <div id="bioUsuario">
                                <p>{bio}</p>
                            </div>
                            <div id="datosPerfil">
                                <p><a href="#"><strong>Seguidos</strong> 40 </a><a href="#"><strong>Seguidores</strong> 40</a></p>
                            </div>
                        </div>
                        <div id="postsContent">
                            <PostUser />
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Perfil