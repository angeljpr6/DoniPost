import React, { Component } from "react";
import axios from "axios";
import { getUser } from "../Recursos/UserLogin";

/**
 * Muetra un recuadro donde puedes escribir un texto y publicarlo en la base de datos
 */
class EscribirPost extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showModal: true, // Cambiado a true para que el modal esté abierto desde el principio
            contenidoDelPost: "",
            mensajeError: ""
        };
    }

    handleCloseModal = () => {
        this.setState({ showModal: false, contenidoDelPost: "", mensajeError: "" });
    }

    handleChange = (event) => {
        const inputValue = event.target.value;
        if (inputValue.length <= 500) {
            this.setState({ contenidoDelPost: inputValue });
        }
    }

    handlePublicarPost = async () => {
        const { contenidoDelPost } = this.state;
        const post = {
            user: getUser(),
            text: contenidoDelPost,
            date: new Date()
        };

        try {
            const response = await axios.post("http://localhost:3900/api/save", post);
            console.log("Post creado:", response.data);
            this.handleCloseModal();
            window.location.reload();
        } catch (error) {
            console.error("Error al crear el post:", error);
            this.setState({ mensajeError: "Error al crear el post. Inténtalo de nuevo." });
        }
    }

    render() {
        return (
            <div>

                <div>
                    
                    <div className="modal">
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
                                <button id="botonPublicarPost" onClick={this.handlePublicarPost}><strong>Publicar</strong></button>
                                {this.state.mensajeError && <p className="error">{this.state.mensajeError}</p>}
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        )
    }
}

export default EscribirPost;