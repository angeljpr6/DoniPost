import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { setFollowers, setUser } from '../Recursos/UserLogin';
import { setBiography } from '../Recursos/UserLogin';


const Register = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [bio, setBio] = useState('');
    
    const [errorMessage, setErrorMessage] = useState('');
    const navigate = useNavigate();


    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            const response = await fetch('http://localhost:3900/api/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ user: username, password, bio })
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const result = await response.json();

            if (response.status === 200) {
                setUser(result.user.name);
                setBiography(result.user.biography);
                navigate('/Inicio');
            } else {
                setErrorMessage(result.message);
            }
        } catch (error) {
            console.error('Error during registration:', error);
            setErrorMessage('Error en el registro. Inténtalo de nuevo.');
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
                <h2 id="login-title">Registrarse</h2>
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

                <input id="login-password"
                    type="text"
                    placeholder="Biografía"
                    value={bio}
                    onChange={(e) => setBio(e.target.value)}
                    required
                />
                <button id="login-button" type="submit">Registrarse</button>
                {errorMessage && <p id="login-error-message">{errorMessage}</p>}
            </form>
        </div>
    );
};

export default Register;