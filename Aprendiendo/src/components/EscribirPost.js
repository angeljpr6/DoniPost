import { Component } from "react";

class EscribirPost extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showModal: false
        };
    }

    handleEscribirPostClick = () => {
        this.setState({ showModal: true });
    }

    handleCloseModal = () => {
        this.setState({ showModal: false });
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
                                <h1>Modal</h1>
                                {/* Aquí puedes añadir más contenido al modal si lo necesitas */}
                            </div>
                        </div>
                    </div>
                )}
            </div>
        )
    }
}

export default EscribirPost;
