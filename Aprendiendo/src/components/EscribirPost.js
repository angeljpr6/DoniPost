import React, { Component } from "react";

class EscribirPost extends Component {
    
    constructor(props) {
        super(props);
        this.state = {
            showModal: false,
            contenidoDelPost: ""
        };
    }

    handleEscribirPostClick = () => {
        this.setState({ showModal: true });
    }

    handleCloseModal = () => {
        this.setState({ showModal: false });
    }

    handleChange = (event) => {
        const inputValue = event.target.value;
        if (inputValue.length <= 500) { // Limitar a 500 caracteres en total
            this.setState({ contenidoDelPost: inputValue });
        }
    }

    render() {
        return (
            <div>
                <a href="#" onClick={this.handleEscribirPostClick}>
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
                                <button id="botonPublicarPost"><strong>Publicar</strong></button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        )
    }
}

export default EscribirPost;

