import React, { Component } from "react";
import axios from "axios";
import { getUser } from "../Recursos/UserLogin";
import { getIdComent } from "../Recursos/ComentData"

class EscribirComentario extends Component {
    constructor(props) {
        super(props);
        this.state = {
            contenidoDelPost: "",
            mensajeError: ""
        };
    }

    handleChange = (event) => {
        const inputValue = event.target.value;
        if (inputValue.length <= 500) {
            this.setState({ contenidoDelPost: inputValue });
        }
    }

    handlePublicarComentario = async () => {
        const { contenidoDelPost } = this.state;
        const comentario = {
            user: getUser(),  // Asumiendo que getUser() devuelve el usuario actual
            text: contenidoDelPost,
            idPost: getIdComent() // ID del post específico
        };

        try {
            const response = await axios.post("http://localhost:3900/api/postComent", comentario);
            console.log("Comentario creado:", response.data);
            this.setState({ contenidoDelPost: "", mensajeError: "" });
            window.location.reload();  // Recargar la página para mostrar los nuevos comentarios
        } catch (error) {
            console.error("Error al crear el comentario:", error);
            this.setState({ mensajeError: "Error al crear el comentario. Inténtalo de nuevo." });
        }
    }

    render() {
        return (
            <div>
                <div id="escribirPost" className="modal">
                    <div className="modal-content">
                        <h1>Escribe aquí</h1>
                        <form>
                            <textarea
                                id="contenidoDelPost"
                                value={this.state.contenidoDelPost}
                                onChange={this.handleChange}
                                maxLength="500"
                                rows="5"
                                cols="50"
                                style={{ resize: "none" }}
                            />
                            <p id="contadorCaracteres">{this.state.contenidoDelPost.length}/500</p>
                        </form>
                        <div id="publicarPost">
                            <button id="botonPublicarPost" onClick={this.handlePublicarComentario}><strong>Publicar</strong></button>
                            {this.state.mensajeError && <p className="error">{this.state.mensajeError}</p>}
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default EscribirComentario;
