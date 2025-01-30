import ReactDOM from "react-dom/client";
import { StrictMode } from "react";
import './index.css'
import { RouterProvider, createBrowserRouter } from "react-router";
import App from './App.jsx'
import CreateTrip from "./CreateTrip/index"
import Header from "./components/custom/Header";
import { Toaster } from "./components/ui/toaster";
import { GoogleOAuthProvider } from '@react-oauth/google';
import ViewTrip from "./viewTrip/[tripID]/index.jsx";
import Footer from "./Footer";
import MyTrips from "./my-trips";


// const root = document.getElementById("root");
const router = createBrowserRouter([
  {
    path: '/',
    element: <App />
  },
  {
    path: '/CreateTrip',
    element: <CreateTrip />
  },
  {
    path: '/viewTrip/:tripID',
    element: <ViewTrip/>
  },
  {
    path: '/my-trips',
    element: <MyTrips/>
  },
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <StrictMode>
    <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_AUTH_CLIENT_ID}>
      <Header />
      <Toaster />
      <RouterProvider router={router} />
      <Footer/>
    </GoogleOAuthProvider>
  </StrictMode>
);
