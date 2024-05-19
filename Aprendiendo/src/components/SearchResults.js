import React from 'react';
import { useParams } from 'react-router-dom';

import Header from './Header';
import BarraLateral from './BarraLateral';

const SearchResults = () => {
    let { search } = useParams();

    return (
        <div>
                <Header/>
                <BarraLateral/>
                <div id="contenido">
                    <div id="resultadoBusqueda">
                        <h1>El resultado para {search}:</h1>
                    </div>
                </div>

            </div>
    );
}

export default SearchResults;
