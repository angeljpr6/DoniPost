import React, { Component } from "react";

class SeccionPruebas extends Component {
    

    state = {
        contador: 0
    };

    

    sumar=()=>{
        this.setState({
            contador: (this.state.contador + 1)
        });
    }

    render() {
        return (
            <div>
                <section id="tweetSection">
                    <div className="tweet">
                        <span className="user">{this.props.user}</span>
                        <span className="date">{this.state.contador}</span>
                        <div className="content">
                            Contenido del Tweet Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorem, aliquid.
                        </div>
                    </div>
                    <input type="button" value="Sumar" onClick={this.sumar} />
                </section>
            </div>
        );
    }
}

export default SeccionPruebas;