import React, { Component } from "react";

import { getFollowerNum, getUser, getUserFollower } from "../Recursos/UserLogin";
import PostUser from "./PostUser";
import Header from "./Header";
import BarraLateral from "./BarraLateral";
import { getBiography } from "../Recursos/UserLogin";
import { getUserFollowing } from "../Recursos/UserLogin";
import { getFollowing } from "../Recursos/UserLogin";
class Perfil extends Component{

    constructor(props) {
        super(props);
        this.state = {
          nombreUsuario: null,
          bio: null,
          following: null,
          followers:null,
          loading: true, // Para manejar la carga de datos
        };
      }
    
      async componentDidMount() {
        const nombreUsuario = getUser();
       
        const bio = getBiography();
    
        await getFollowerNum(nombreUsuario)
        await getFollowing(nombreUsuario);
        const following=getUserFollowing();
        const followers=getUserFollower()
        
        
    
        this.setState({
          nombreUsuario:nombreUsuario,
          bio:bio,
          following:following,
          followers:followers,
          loading: false,
        });
      }

      
    
      render() {
        const { nombreUsuario, bio, following,followers, loading } = this.state;
   
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
                                <p><a href="#"><strong>Seguidos</strong> {following} </a><a href="#"><strong>| Seguidores</strong> {followers}</a></p>
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