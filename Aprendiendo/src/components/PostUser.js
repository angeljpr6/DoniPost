import React, { Component } from "react";
import axios from "axios";
import { getUser } from "../Recursos/UserLogin";
import meGusta from '../assets/images/me-gusta.png';
import comentario from '../assets/images/comentario.png';
import basura from '../assets/images/eliminar.png';
import repost from '../assets/images/repost.png';

class PostUser extends Component {

    state = {
        posts: [],
        status: null
    };

    componentDidMount() {
        this.getPostsByUser();
    }

    getPostsByUser = () => {
        const user = getUser();
        axios.get(`http://localhost:3900/api/getuserposts/${user}`)
            .then(res => {
                this.setState({
                    posts: res.data.post,
                    status: "success"
                });
            });
    }

    handleDeletePost = (postId) => {
        axios.delete(`http://localhost:3900/api/posts/${postId}`)
            .then(res => {
                console.log('Post eliminado correctamente');
                // Actualizar la lista de posts después de eliminar el post
                this.getPostsByUser();
            })
            .catch(error => {
                console.error('Error al eliminar el post:', error);
            });
    }

    render() {
        if (this.state.posts.length >= 1) {
            var listPosts = this.state.posts.map((post) => {
                // Verificar si el nombre de usuario del post coincide con el nombre de usuario actual
                const currentUser = getUser();
                const canDelete = post.user === currentUser;

                return (
                    <div id="post" key={post._id}>
                        {canDelete && (
                            <div id="eliminar-post" >
                                <a href="#" className="" onClick={() => this.handleDeletePost(post._id)}>
                                    <img src={basura} alt="basura"></img>
                                </a>
                            </div>
                        )}
                        <h3>@{post.user}</h3>
                        <p>{post.text}</p>
                        <p id="date">{post.date}</p>
                        <div id="accionesPost">
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
        } else if (this.state.posts.length === 0 && this.state.status === "success") {
            return (
                <div>
                    <h3>No hay posts</h3>
                </div>
            )
        } else {
            return (
                <div>
                    <h3>Cargando....</h3>
                </div>
            )
        }
    }
}

export default PostUser;
