import React, { Component } from "react";

import { getUser } from "../Recursos/UserLogin";
import PostUser from "./PostUser";

class Perfil extends Component{

    render(){
        const nombreUsuario = getUser()
        console.log(nombreUsuario)
        return(
            <div id="contenido">
                
                <div id="perfil">
                    <div id="infoPerfil">
                        <h1>{nombreUsuario}</h1>
                        <div id="bioUsuario">
                            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus tristique molestie rutrum. Aenean vel auctor nibh, id eleifend urna. In varius nulla eget velit hendrerit, non euismod neque interdum. Pellentesque quam tortor, posuere quis dui ut, euismod vulputate lacus. Nam ultricies eget ipsum ac ultricies. Praesent a mauris dictum nisl imperdiet fermentum id aliquam est. Donec egestas vel urna in viverra. Sed vitae porta dui. Curabitur eget aliquam metus, id venenatis odio. Nam quis mauris eu nulla faucibus lacinia efficitur at mi. Curabitur at ligula orci. Nullam id tristique nibh.</p>
                        </div>
                        <div id="datosPerfil">
                            <p><a href="#"><strong>Seguidos</strong> 40 </a><a href="#"><strong>Seguidores</strong> 40</a></p>
                        </div>
                    </div>
                    <div id="postsContent">
                        <PostUser />
                    </div>
                </div>
            </div>
        )
    }
}

export default Perfil