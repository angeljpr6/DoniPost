import React, { Component } from "react";

import PostUser from "./PostUser";

class Perfil extends Component{

    render(){
        return(
            <div id="contenido">

                <div id="postsContent">
                    <PostUser />
                </div>
            </div>
        )
    }
}

export default Perfil