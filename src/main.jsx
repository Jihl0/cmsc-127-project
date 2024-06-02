import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import Root from './pages/Root';
import Login from './pages/Signin';
import Register from './pages/Signup';

const router = createBrowserRouter([
  { path: '/', element: <Root /> },
  { path: '/signup', element: <Register /> },
  { path: '/signin', element: <Login /> },
  { path: '/user-homepage', element: <Homepage /> },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
