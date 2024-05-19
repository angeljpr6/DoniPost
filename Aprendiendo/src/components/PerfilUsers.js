import React, { Component } from "react";


import Header from "./Header";
import BarraLateral from "./BarraLateral";
import PostUserData from "./PostUserData";
import { getUserData } from "../Recursos/UserData";
import { getFollowingNumUserData } from "../Recursos/UserData";
import { getUserDataFollowing } from "../Recursos/UserData";

class PerfilUsers extends Component{

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
        const nombreUsuario = getUserData();
       
     
    
        await getFollowingNumUserData(nombreUsuario);
        const following=getUserDataFollowing();
        
        
    
        this.setState({
          nombreUsuario:nombreUsuario,
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
                            <div id="contenedorNombreYSeguirUsuario">
                                <h1>@{nombreUsuario}</h1>
                                <button id="botonSeguirUsuario"><strong>Seguir</strong></button>
                            </div>
                            
                            <div id="bioUsuario">
                                <p>hdhddh</p>
                            </div>
                            <div id="datosPerfil">
                                <p><a href="#"><strong>Seguidos</strong> {following} </a><a href="#"><strong>Seguidores</strong> 40</a></p>
                            </div>
                        </div>
                        <div id="postsContent">
                            <PostUserData />
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default PerfilUsers