import ReactDOM from "react-dom/client";
import { StrictMode } from "react";
import './index.css'
import { RouterProvider, createBrowserRouter } from "react-router";
import App from './App.jsx'
import CreateTrip from "./CreateTrip/CreateTrip";
import Header from "./components/custom/Header";


// const root = document.getElementById("root");
const router = createBrowserRouter([
  {
    path: '/',
    element: <App/>
  },
  {
    path:'/CreateTrip',
    element:<CreateTrip/>
  }
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Header/>
    <RouterProvider router={router}/>
  </StrictMode>
);
