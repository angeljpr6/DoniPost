import React, { Component } from "react";

class Post extends Component {
    render() {
        const { usuario, contenido, contador } = this.props.post;

        return (
            <section id="tweetSection">
                
                <div className="tweet">
                    <span className="user">{usuario}</span>
                    <span className="date">{contador}</span>
                    <div className="content">{contenido}</div>
                </div>
            </section>
        )
    }
}

export default Post