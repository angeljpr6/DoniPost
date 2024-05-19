import React, { Component } from "react";

import { getUser } from "../Recursos/UserLogin";
import PostUser from "./PostUser";
import Header from "./Header";
import BarraLateral from "./BarraLateral";
import { getBiography } from "../Recursos/UserLogin";
import { getUserFollowing } from "../Recursos/UserData";
import { getFollowing } from "../Recursos/UserData";
class Perfil extends Component{

    constructor(props) {
        super(props);
        this.state = {
          nombreUsuario: null,
          bio: null,
          following: null,
          loading: true, // Para manejar la carga de datos
        };
      }
    
      async componentDidMount() {
        const nombreUsuario = getUser();
       
        const bio = getBiography();
    
        // Asumiendo que getFollowing devuelve una promesa
        await getFollowing(nombreUsuario);
        const following=getUserFollowing();
        
        
    
        this.setState({
          nombreUsuario:nombreUsuario,
          bio:bio,
          following:following,
          loading: false,
        });
      }
    
      render() {
        const { nombreUsuario, bio, following, loading } = this.state;
        
        
        
        
        
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
                                <p><a href="#"><strong>Seguidos</strong> {following} </a><a href="#"><strong>Seguidores</strong> 40</a></p>
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