import React, { useState } from 'react';
import axios from 'axios';

function Register() {
    const [fname, setFname] = useState('');
    const [lname, setLname] = useState('');
    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleRegister = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:5000/register', {
                username,
                email,
                password
            });
            alert(response.data);
        } catch (error) {
            console.error('Error registering:', error.response ? error.response.data : error);
            alert('Error registering. Please try again.');
        }
    };

    return (
        <div className='page-container'>
            <div className='sign-up-form-container'>
                <form className='sign-up-form' onSubmit={handleRegister}>
                    <br />
                    <div className="sign-up"> SIGN UP </div>
                    <br />
                    <input className='input' type='email' placeholder='Email' value={email} onChange={(e) => setEmail(e.target.value)} required/>
                    <br />
                    <input className='input' type='text' placeholder='Username' value={username} onChange={(e) => setUsername(e.target.value)} required/>
                    <br />
                    <input className='input' type='password' placeholder='Password' value={password} onChange={(e) => setPassword(e.target.value)} required/>
                    <br />
                    <div className="bottom-container"> 
                        <button className='sign-up-button' type='submit'> Sign Up </button>

                    </div>
                </form>
            </div>      
        </div>
    );
}

export default Register;
