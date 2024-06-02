import React from 'react';
import { Link } from 'react-router-dom';
import '../style/root_page.css';

function Root() {
  return (
    <div className="page-container">
      <header className="App-header">
        <h1>Welcome to Food Review System</h1>
        <div>
          <Link to="/signin">
            <button>Login</button>
          </Link>
          <Link to="/signup">
            <button>Register</button>
          </Link>
        </div>
      </header>
    </div>
  );
}

export default Root;
