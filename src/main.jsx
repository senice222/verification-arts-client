import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './index.css'
import Login from './pages/Login/Login'

const router = createBrowserRouter([
  {
    path: "/login",
    element: (
      <Login />
    ),
  },
  {
    path: "/",
    element: <div>About</div>,
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <RouterProvider router={router} />
)
