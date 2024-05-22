import React, { Component } from "react";
import meGusta from '../assets/images/me-gusta.png'
import comentario from '../assets/images/comentario.png'
import repost from '../assets/images/repost.png'
import axios from "axios";
import { getUser } from "../Recursos/UserLogin";
import { setUserData } from "../Recursos/UserData";
import { setIdComent } from "../Recursos/ComentData"
import { getUserData } from "../Recursos/UserData";
import { Navigate } from "react-router-dom";


class PostCard extends Component {


    state = {
        posts: [],
        status: null
    };
    
    

    componentDidMount() {
        this.getPosts();
    }
    /**
     * Obtiene los posts de los usuarios a los que sigue el usuario logueado
     */
    getPosts = () => {
        const user = getUser()

        const url = `http://localhost:3900/api/${user}/followingPosts`;

        axios.get(url)
            .then(res => {
                this.setState({
                    posts: res.data.posts,
                    status: "success"
                });

            });
    }
    /**
     * Cambia el userData al clickar en el nombre del usuario
     * @param {*} user 
     */
    handleUserClick = (user) => {
        setUserData(user);
        console.log(getUserData())
    }

    handleCommentData = (id) => {
        setIdComent(id);
    }

    render() {
        if (this.state.posts.length >= 1) {

            var listPosts = this.state.posts.map((post) => {

                return (

                    <div id="post" >
                        <h3>
                            <a className="usuarios" href="/Perfil/user" onClick={(e) => { this.handleUserClick(post.user); }}>
                                @{post.user}
                            </a>
                        </h3>
                        <p>{post.text}</p>
                        <p id="date">{formatearFecha(post.date)}</p>
                        <div id="accionesPost">
                            <a href="Post/comentarios" className="entrar-comentarios" onClick={(e) => {this.handleCommentData(post._id); }}>
                                <img src={comentario} alt="iconoComentarios"></img>
                            </a>
                        </div>

                    </div>
                )
            })
            return (
                <div>{listPosts}</div>

            )
        } else if (this.state.posts.length == 10 && this.state.status == "success") {
            return (
                <div>
                    <h3>No hay posts</h3>

                </div>
            )
        } else {
            <div>
                <h3>Cargando....</h3>
            </div>
        }
    }
}


function formatearFecha(fechaStr) {
    // Crear un objeto Date a partir de la cadena de fecha
    var fecha = new Date(fechaStr);
    
    // Obtener los componentes de la fecha
    var dia = fecha.getDate();
    var mes = fecha.getMonth() + 1; // Se agrega 1 porque los meses comienzan en 0
    var año = fecha.getFullYear();
    var horas = fecha.getHours();
    var minutos = fecha.getMinutes();
    var segundos = fecha.getSeconds();
    
    // Asegurarse de que los componentes tengan dos dígitos
    if (dia < 10) {
        dia = '0' + dia;
    }
    if (mes < 10) {
        mes = '0' + mes;
    }
    if (horas < 10) {
        horas = '0' + horas;
    }
    if (minutos < 10) {
        minutos = '0' + minutos;
    }
    if (segundos < 10) {
        segundos = '0' + segundos;
    }
    
    // Formatear la fecha en el formato deseado (dd/mm/yyyy hh:mm:ss)
    var fechaFormateada = dia + '/' + mes + '/' + año + ' ' + horas + ':' + minutos + ':' + segundos;
    
    return fechaFormateada;
}
export{formatearFecha}
export default PostCard