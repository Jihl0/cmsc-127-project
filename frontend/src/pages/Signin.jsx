import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

import '../style/signin_page.css';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/login', {
        email,
        password,
      });
      alert(response.data);
      if (response.status === 200) {
        navigate('/user-homepage');
      }
    } catch (error) {
      console.error(
        'Error logging in:',
        error.response ? error.response.data : error
      );
      alert('Invalid email or password');
    }
  };

  return (
    <div className="signin-container">
      <img
        src="https://images.pexels.com/photos/1581384/pexels-photo-1581384.jpeg?cs=srgb&dl=pexels-reneasmussen-1581384.jpg&fm=jpg"
        alt="image-decor"
      />
      <div className="login-container">
        <form className="login-form" onSubmit={handleLoginSubmit}>
          <h1>LOGIN</h1>
          <input
            className="username-input"
            type="text"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            className="password-input"
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button className="log-in-button" type="submit">
            Login
          </button>
        </form>
      </div>
    </div>
  );
}
