const { Component } = require("react");

class BarraLateral extends Component {
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
            <div id="barraLat">
                <a href="/Inicio">
                    <h2>Inicio</h2>
                </a>
                <a href="/Perfil">
                    <h2>Perfil</h2>
                </a>
                <a href="/Perfil">
                    <h2>Opciones</h2>
                </a>
                <a href="#" onClick={this.handleEscribirPostClick}>
                    <h2>Escribir Post</h2>
                </a>
                {this.state.showModal && (
                    <div className="modal">
                        <div className="modal-content">
                            <span className="close" onClick={this.handleCloseModal}>&times;</span>
                            <h1>Modal</h1>
                            {/* Aquí puedes añadir más contenido al modal si lo necesitas */}
                        </div>
                    </div>
                )}
            </div>
        )
    }
}

export default BarraLateral;
