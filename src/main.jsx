import { createRoot } from 'react-dom/client'
import './index.css'
import { AuthProvider } from './context/AuthProvider'
import { RouterProvider } from 'react-router-dom'
import { router } from './router/Routes'
import { StrictMode } from 'react'
import { ToastContainer } from 'react-toastify'


createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
      <ToastContainer position="top-center" autoClose={3000} />
    </AuthProvider>
  </StrictMode>
);
