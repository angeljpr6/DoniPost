import { Component } from "react";

import PostCard from "./PostCard";

class Inicio extends Component {

    render(){

        return(
            <div id="contenido">
                <div id="postsContent">
                    <PostCard />
                </div>
            </div>

        )

    }

}

export default Inicio