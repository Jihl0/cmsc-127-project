import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleLoginSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:5000/login', { email, password });
            alert(response.data);
            if (response.status === 200) {
                navigate('/user-homepage');
            }
        } catch (error) {
            console.error('Error logging in:', error.response ? error.response.data : error);
            alert('Invalid email or password');
        }
    };

    return (
        <div className='page-container'>
            <div className='log-in-form-container'>
                <form className='log-in-form' onSubmit={handleLoginSubmit}>
                    <br />
                    <p className="log-in"><b><center>LOGIN</center></b></p>
                    <input className='username-input' type='text' placeholder='Email' value={email} onChange={(e) => setEmail(e.target.value)} />
                    <br />
                    <br />
                    <input className='password-input' type='password' placeholder='Password' value={password} onChange={(e) => setPassword(e.target.value)} />
                    <br />
                    <br />
                    <button className='log-in-button' type='submit'>Login</button>
                    <br />
                </form>
            </div>      
        </div>
    );
}

export default Login;
