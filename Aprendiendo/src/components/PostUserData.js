import React, { Component } from "react";

import meGusta from '../assets/images/me-gusta.png'
import comentario from '../assets/images/comentario.png'
import repost from '../assets/images/repost.png'
import axios from "axios";
import { getUserData } from "../Recursos/UserData";
import { formatearFecha } from "./PostCard";


class PostUserData extends Component{

    state = {
        posts: [],
        status: null
    };

    componentDidMount() {
        this.getPostsByUser();
    }

    /**
     * Obtiene los post del usuario
     */
    getPostsByUser = () => {
        const user=getUserData();
        axios.get(`http://localhost:3900/api/getuserposts/${user}`)
            .then(res => {
                this.setState({
                    posts: res.data.post,
                    status: "success"
                });
            });
    }

    render(){

        if (this.state.posts.length >= 1) {

            var listPosts = this.state.posts.map((post) => {
            
                return (
                    
                    <div id="post" key={post._id}>
                        <h3>@{post.user}</h3>
                        <p>{post.text}</p>
                        <p id="date">{formatearFecha(post.date)}</p>
                        <div id = "accionesPost">
                            <a href="#" className="dar-me-gusta">
                                <img src={comentario} alt="iconoMeGusta"></img>
                            </a>
                            <a href="#" className="dar-repost">
                                <img src={repost} alt="iconoRePost"></img>
                            </a>
                            <a href="#" className="entrar-comentarios">
                                <img src={meGusta} alt="iconoComentarios"></img>
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

export default PostUserData