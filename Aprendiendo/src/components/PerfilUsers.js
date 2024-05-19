import React, { Component } from "react";

import axios from "axios";
import Header from "./Header";
import BarraLateral from "./BarraLateral";
import PostUserData from "./PostUserData";
import { getFollowergNumUserData, getUserData, getUserDataFollower } from "../Recursos/UserData";
import { getFollowingNumUserData } from "../Recursos/UserData";
import { getUserDataFollowing } from "../Recursos/UserData";
import { getUser } from "../Recursos/UserLogin";


class PerfilUsers extends Component {
    constructor(props) {
        super(props);
        this.state = {
            nombreUsuario: null,
            bio: null,
            following: null,
            followers: null,
            loading: true,
            esSeguidor: false
        };
    }

    async componentDidMount() {
        const nombreUsuario = getUserData();

        // Obtener los seguidores y seguidos del usuario del perfil
        await getFollowergNumUserData(nombreUsuario);
        await getFollowingNumUserData(nombreUsuario);
        const following = getUserDataFollowing();
        const followers = getUserDataFollower();

        // Obtener todos los seguidores del usuario del perfil desde la API
        try {
            const response = await axios.get("http://localhost:3900/api/allFollowers");
            const allFollowers = response.data.followers;
            const user=getUser();

            // Verificar si el usuario logueado es un seguidor del usuario del perfil
            const esSeguidor = allFollowers.some(seg => seg.follower === getUser() && seg.following === this.state.nombreUsuario);
            console.log(esSeguidor)
            

            this.setState({
                user:user,
                nombreUsuario: nombreUsuario,
                following: following,
                followers: followers,
                loading: false,
                esSeguidor: esSeguidor
            });

            console.log(this.state.user+" d "+this.state.nombreUsuario)
        } catch (error) {
            console.error("Error al obtener los seguidores:", error);
        }
    }

    seguir = async () => {
        
        try {
            await axios.post("http://localhost:3900/api/follow", {
                follower: this.state.user,
                following: this.state.nombreUsuario
            });
            this.setState({ esSeguidor: true });
            console.log("Ahora estás siguiendo al usuario del perfil.");
        } catch (error) {
            console.error("Error al intentar seguir al usuario del perfil:", error);
        }
    }
    
    dejarDeSeguir = async () => {
        
        console.log(this.state.nombreUsuario+"  "+this.state.user)
        try {
            await axios.post("http://localhost:3900/api/unfollow", {
                follower: this.state.user,
                following: this.state.nombreUsuario
            });
            
            this.setState({ esSeguidor: false });
            console.log("Has dejado de seguir al usuario del perfil.");
        } catch (error) {
            console.error("Error al intentar dejar de seguir al usuario del perfil:", error);
        }
    }

    render() {
        const { nombreUsuario, bio, following, followers, loading, esSeguidor } = this.state;

        return (
            <div>
                <Header />
                <BarraLateral />
                <div id="contenido">
                    <div id="perfil">
                        <div id="infoPerfil">
                            <div id="contenedorNombreYSeguirUsuario">
                                <h1>@{nombreUsuario}</h1>
                                <button id="botonSeguirUsuario" onClick={esSeguidor ? this.dejarDeSeguir.bind(this) : this.seguir.bind(this)}>
                                    <strong>{esSeguidor ? 'Dejar de seguir' : 'Seguir'}</strong>
                                </button>
                            </div>
                            <div id="bioUsuario">
                                <p>{bio}</p>
                            </div>
                            <div id="datosPerfil">
                                <p>
                                    <a href="#"><strong>Seguidos</strong> {following} </a>
                                    <a href="#"><strong>| Seguidores</strong> {followers} </a>
                                </p>
                            </div>
                        </div>
                        <div id="postsContent">
                            <PostUserData />
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default PerfilUsers;