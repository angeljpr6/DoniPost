import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { setUserData } from "../Recursos/UserData";
import { getUserData } from "../Recursos/UserData";
import { getUser } from '../Recursos/UserLogin'; // Importar la función getUser

import Header from './Header';
import BarraLateral from './BarraLateral';

const SearchResults = () => {
    const { search } = useParams();
    const [searchResults, setSearchResults] = useState([]);

    useEffect(() => {
        const fetchSearchResults = async () => {
            try {
                const response = await axios.get(`http://localhost:3900/api/searchusers/${search}`);
                setSearchResults(response.data.users);
            } catch (error) {
                console.error('Error al obtener resultados de búsqueda:', error);
            }
        };

        fetchSearchResults();
    }, [search]);

    const handleUserClick = (user) => {
        setUserData(user);
        console.log(getUserData())
    }

    const currentUser = getUser(); // Obtener el nombre de usuario actual

    return (
        <div>
            <Header />
            <BarraLateral />
            <div id="contenido">
                <div id="resultadoBusqueda" className="search-results-container">
                    <h1>El resultado para "{search}":</h1>
                    <ul className="user-list">
                        {searchResults.map(user => (
                            // Filtrar para ignorar el usuario actual
                            user.name !== currentUser && (
                                <li key={user._id} className="user">
                                    <a href="/Perfil/user" onClick={(e) => { handleUserClick(user.name); }}>{user.name}</a>
                                </li>
                            )
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
}

export default SearchResults;
