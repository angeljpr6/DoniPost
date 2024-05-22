import React, { Component } from "react";
import axios from "axios";
import Header from "./Header";
import BarraLateral from "./BarraLateral";
import PostUserData from "./PostUserData";
import { getFollowergNumUserData, getUserData, getUserDataFollower } from "../Recursos/UserData";
import { getFollowingNumUserData } from "../Recursos/UserData";
import { getUserDataFollowing } from "../Recursos/UserData";
import { getUser } from "../Recursos/UserLogin";

/**
 * Muestra el apartado del perfil de un usario externo (Un usuario que no es el que esta usando la aplicacion)
 */
class PerfilUsers extends Component {
    constructor(props) {
        super(props);
        this.state = {
            nombreUsuario: null,
            bio: null,
            following: null,
            followers: null,
            loading: true,
            esSeguidor: false,
            user: null 
        };
    }


    /**
     * Carga los datos del usuario (la bio o si sigues al usuario)
     */
    async componentDidMount() {
        const nombreUsuario = getUserData();

        // Obtener los seguidores y seguidos del usuario del perfil
        await getFollowergNumUserData(nombreUsuario);
        await getFollowingNumUserData(nombreUsuario);
        const following = getUserDataFollowing();
        const followers = getUserDataFollower();

        // Obtener todos los seguidores del usuario del perfil desde la API
        try {
            const responseFollowers = await axios.get("http://localhost:3900/api/allFollowers");
            const allFollowers = responseFollowers.data.followers;
            const user = getUser();

            // Verificar si el usuario logueado es un seguidor del usuario del perfil
            const esSeguidor = allFollowers.some(seg => seg.follower === user && seg.following === nombreUsuario);

            // Obtener la biografía del usuario desde la API
            const responseBio = await axios.get(`http://localhost:3900/api/getuserbio/${nombreUsuario}`);
            const bio = responseBio.data.biography;
            console.log("Biografia : "+bio)

            this.setState({
                user: user,
                nombreUsuario: nombreUsuario,
                bio: bio, // Actualizar la biografía en el estado
                following: following,
                followers: followers,
                loading: false,
                esSeguidor: esSeguidor
            });

            console.log(`${user} d ${nombreUsuario}`);
        } catch (error) {
            console.error("Error al obtener los seguidores o la biografía:", error);
        }
    }

    /**
     * Funcion para seguir al usuario del que ves el perfil
     */
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
    
    /**
     * Funcion para dejar de seguir al usuario del que ves el perfil
     */
    dejarDeSeguir = async () => {
        console.log(`${this.state.nombreUsuario}  ${this.state.user}`);
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
                                <button id="botonSeguirUsuario" onClick={esSeguidor ? this.dejarDeSeguir : this.seguir}>
                                    <strong>{esSeguidor ? 'Dejar de seguir' : 'Seguir'}</strong>
                                </button>
                            </div>
                            <div id="bioUsuario">
                                <p>{bio}</p> {/* Mostrar la biografía */}
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
