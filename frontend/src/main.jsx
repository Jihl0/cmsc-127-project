import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Root from './pages/Root';
import Login from './pages/Signin';
import Register from './pages/Signup';
import Homepage from './pages/User/Homepage';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Root />} />
        <Route path="/signup" element={<Register />} />
        <Route path="/signin" element={<Login />} />
        <Route path="/user-homepage/*" element={<Homepage />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);