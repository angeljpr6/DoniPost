import React, { Component } from "react";
import axios from "axios";
import Header from "./Header";
import BarraLateral from "./BarraLateral";
import EscribirComentario from "./EscribirComentario";
import { getIdComent } from "../Recursos/ComentData"
import { formatearFecha } from "./PostCard"; // Asegúrate de que esta función esté definida

class Comentarios extends Component {
    state = {
        comments: [],
        status: null,
        postId: getIdComent() // ID del post específico
    };

    componentDidMount() {
        this.getComments();
    }

    getComments = () => {
        const { postId } = this.state;
        const url = `http://localhost:3900/api/getcomentsByPostId/${postId}`;

        axios.get(url)
            .then(res => {
                if (res.data.coments) {
                    this.setState({
                        comments: res.data.coments,
                        status: "success"
                    });
                } else {
                    this.setState({
                        status: "error"
                    });
                }
            })
            .catch(err => {
                console.error(err);
                this.setState({
                    status: "error"
                });
            });
    }

    render() {
        const { comments, status } = this.state;

        return (
            <div>
                <Header />
                <BarraLateral />
                <div id="contenido">
                    <div id="perfil">

                        <EscribirComentario />
                        <div id="post">
                            {status === "success" ? (
                                comments.map(comment => (
                                    <div key={comment._id} className="comment">
                                        <h3>
                                            <a className="usuarios" href={`/Perfil/${comment.user}`}>
                                                @{comment.user}
                                            </a>
                                        </h3>
                                        <p>{comment.text}</p>
                                        <p id="date">{formatearFecha(comment.date)}</p>
                                    </div>
                                ))
                            ) : (
                                <p>No se encontraron comentarios.</p>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Comentarios;
