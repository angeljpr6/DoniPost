import { Component } from "react";

import PostCard from "./PostCard";
import Header from "./Header";
import BarraLateral from "./BarraLateral";
class Inicio extends Component {

    render() {

        return (
            <div>
                <Header/>
                <BarraLateral/>
                <div id="contenido">
                    <div id="postsContent">
                        <PostCard/>
                    </div>
                </div>

            </div>


        )

    }

}

export default Inicio