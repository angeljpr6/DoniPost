import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { setFollowers, setUser } from '../Recursos/UserLogin';
import { setBiography } from '../Recursos/UserLogin';

/**
 * Componente Formulario de login
 * @returns 
 */
const LoginForm = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const navigate = useNavigate();

    /**
     * Botón para hacer el login
     * @param {*} event 
     */
    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            //se valida usuario y contraseña
            const response = await fetch('http://localhost:3900/api/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ name: username, password })
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const result = await response.json();

            if (response.status === 200) {
                //se abra la ventana de inicio
                setUser(result.user.name)
                setBiography(result.user.biography)
                navigate('/Inicio');
            } else {
                setErrorMessage(result.message);
            }
        } catch (error) {
            console.error('Error durante el login:', error);
            setErrorMessage('Usuario o contraseña incorrectos');
        }
    };

    return (
        <div id="login-form">
            <form id="login-form-inner" onSubmit={handleSubmit}>
                <div>
                    <span id="brand">
                        <strong>Doni</strong>Post
                    </span>
                </div>
                <h2 id="login-title">Iniciar sesión</h2>
                <input id="login-username"
                    type="text"
                    placeholder="Nombre de usuario"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                />
                <input id="login-password"
                    type="password"
                    placeholder="Contraseña"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
                
                <button id="login-button" type="submit">Ingresar</button>
                <a className='registrarse' href='/Register'>Registrarse</a>
                {errorMessage && <p id="login-error-message">{errorMessage}</p>}
            </form>
        </div>
    );
};

export default LoginForm;