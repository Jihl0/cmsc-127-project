import React from 'react';

function Login() {



  return (
    <div className='page-container'>
        <div className='log-in-form-container'>

            <form className='log-in-form' onSubmit={handleLoginSubmit}>

            <br />
            <p className="log-in"><b><center>LOGIN</center></b></p>
            <input className='username-input' type='text' placeholder='Username' value={username} onChange={(e) => setUsername(e.target.value)} />
            <br />
            <br />
            <input className='password-input' type='password' placeholder='Password' value={password} onChange={(e) => setPassword(e.target.value)} />
            <br />
            <br />

            <button className='log-in-button' type='submit'> Login </button>
            <br />

            <div className="sign-up-link"> 
            <p> Don't have an account? <a className="link" href='http://localhost:5173/signup'> Sign Up </a></p>
            </div>

            </form>
        </div>      
    </div>
)
}

export default Login;
