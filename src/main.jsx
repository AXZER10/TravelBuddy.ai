import ReactDOM from "react-dom/client";
import { StrictMode } from "react";
import './index.css'
import { RouterProvider, createBrowserRouter } from "react-router";
import App from './App.jsx'
import CreateTrip from "./CreateTrip";
import Header from "./components/custom/Header";
import { Toaster } from "./components/ui/toaster";
import { GoogleOAuthProvider } from '@react-oauth/google';


// const root = document.getElementById("root");
const router = createBrowserRouter([
  {
    path: 'CreateTrip',
    element: <CreateTrip />
  },
  {
    path: '/',
    element: <App />
  },
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <StrictMode>
    <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_AUTH_CLIENT_ID}>
      <Header />
      <Toaster />
      <RouterProvider router={router} />
    </GoogleOAuthProvider>;
  </StrictMode>
);
