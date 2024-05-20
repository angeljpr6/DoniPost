import React, { Component } from "react";
import axios from "axios"; // Asegúrate de tener axios instalado: npm install axios
import { Navigate } from "react-router-dom"; // Importa Navigate


import { getUser } from "../Recursos/UserLogin";

class EscribirPost extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showModal: false,
            contenidoDelPost: "",
            mensajeError: ""
        };
    }

    handleEscribirPostClick = (event) => {
        event.preventDefault();
        this.setState({ showModal: true });
    }

    handleCloseModal = () => {
        this.setState({ showModal: false, contenidoDelPost: "", mensajeError: "" });
    }

    handleChange = (event) => {
        const inputValue = event.target.value;
        if (inputValue.length <= 500) { // Limitar a 500 caracteres en total
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
            this.handleCloseModal(); // Cerrar el modal después de publicar el post
        } catch (error) {
            console.error("Error al crear el post:", error);
            this.setState({ mensajeError: "Error al crear el post. Inténtalo de nuevo." });
        }
    }

    render() {
        return (
            <div>
                <a href="" onClick={this.handleEscribirPostClick}>
                    <h2>Escribir Post</h2>
                </a>
                {this.state.showModal && (
                    
                    <div>
                        
                        <div className="modal-backdrop"></div> {/* Capa de fondo oscuro */}
                        <div className="modal">
                            <div className="modal-content">
                                <span className="close" onClick={this.handleCloseModal}>&times;</span>
                                <h1>Escribe aquí</h1>
                                <form>
                                    <textarea 
                                        id="contenidoDelPost"
                                        value={this.state.contenidoDelPost}
                                        onChange={this.handleChange}
                                        maxLength="500" // Limita a 500 caracteres en total
                                        rows="5" // Muestra 5 filas inicialmente
                                        cols="50" // 50 caracteres por línea (aproximadamente)
                                        style={{ resize: "none" }} // Deshabilita el redimensionamiento
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
                )}
            </div>
        )
    }
}

export default EscribirPost;