import { Component } from "react";
import axios from "axios";
import PostCard from "./PostCard";
import Header from "./Header";
import BarraLateral from "./BarraLateral";
import EscribirComentario from "./EscribirComentario";
import { formatearFecha } from "./PostCard";

/**
 * Muestra la pagina de inicio de la aplicacion
 */
class Comentarios extends Component {

    getComments = () => {
        const post = null
        const comment = null
        const url = `http://localhost:3900/api/${post}/commentsPost`;

        axios.get(url)
            .then(res => {
                this.setState({
                    posts: res.data.posts,
                    status: "success"
                });

            });
    }

    render() {

        return (
            <div>
                <Header />
                <BarraLateral />
                <div id="contenido">
                    <EscribirComentario />
                    <div id="post" >
                        <h3>
                            <a className="usuarios" href="/Perfil/user">
                                @{/*comment.user*/}
                            </a>
                        </h3>
                        <p>{/*post.text*/}</p>
                        <p id="date">{/*formatearFecha(comment.date)*/}</p>

                    </div>
                </div>

            </div>


        )

    }

}

export default Comentarios