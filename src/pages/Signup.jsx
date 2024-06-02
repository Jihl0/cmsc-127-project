import React from 'react';

function Register() {
  
  // register function here


  return (
    <div className='page-container'>
      <div className='sign-up-form-container'>
        <form className='sign-up-form' onSubmit={handleRegister}>
          <br />
          <div className="sign-up"> SIGN UP </div>
          <input className='input' type='text' placeholder='First Name' value={fname} onChange={(e) => setFname(e.target.value)} required/>
          {/* <br /> */}
          <br />
          <input className='input' type='text' placeholder='Last Name' value={lname} onChange={(e) => setLname(e.target.value)} required/>
          {/* <br /> */}
          <br />
          <input className='input' type='email' placeholder='Email' value={email} onChange={(e) => setEmail(e.target.value)} required/>
          {/* <br /> */}
          <br />
          <input className='input' type='text' placeholder='Username' value={username} onChange={(e) => setUsername(e.target.value)} required/>
          {/* <br /> */}
          <br />
          <input className='input' type='password' placeholder='Password' value={password} onChange={(e) => setPassword(e.target.value)} required/>
          <br />
          {/* <br /> */}
          <div className="bottom-container"> 
          {/* button */}
          <p className="terms"> By clicking sign up, you agree to User Agreement, Privacy Policy, and Cookie Policy </p>
          {/* <br /> */}
          <button className='sign-up-button' type='submit'> Sign Up </button>
          <br />
          <p className="log-in-link">Already have an account? Log in<a className="link" href='http://localhost:3000/login'> here</a></p>
          <br />
          </div>
        </form>
      </div>      
    </div>
  )
}

export default Register;
