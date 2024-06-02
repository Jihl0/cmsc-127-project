import { useState } from 'react';
import axios from 'axios';

import '../style/signup_page.css';

export default function Register() {
  //   const [fname, setFname] = useState('');
  //   const [lname, setLname] = useState('');
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/register', {
        username,
        email,
        password,
      });
      alert(response.data);
    } catch (error) {
      console.error(
        'Error registering:',
        error.response ? error.response.data : error
      );
      alert('Error registering. Please try again.');
    }
  };

  return (
    <div className="signup-page-container">
      <img
        src="https://images.pexels.com/photos/1581384/pexels-photo-1581384.jpeg?cs=srgb&dl=pexels-reneasmussen-1581384.jpg&fm=jpg"
        alt="image-decor"
      />
      <div className="signup-form-container">
        <form className="signup-form" onSubmit={handleRegister}>
          <h1>SIGN UP</h1>
          <input
            className="input"
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            className="input"
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
          <input
            className="input"
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <div className="bottom-container">
            <button className="sign-up-button" type="submit">
              Sign Up
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
