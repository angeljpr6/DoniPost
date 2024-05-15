import React from "react";
var postt={
    user:"daniel",
    contenido:"jdhdhddhd"
};

class Componente extends React.Component{

    
    render(){
        return(
            <div className="component">
                <p>{postt.user}</p>
                <p>{postt.contenido}</p>
            </div>
        )
    }
}

export default Componente;