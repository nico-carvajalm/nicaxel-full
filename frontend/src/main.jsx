import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"; 

import "./styles/carrito.css"; 
import "./styles/catalogo.css"; 
import "./styles/contacto.css"; 
import "./styles/login.css"; 
import "./styles/nosotros.css"; 
import "./styles/panelAdmin.css"; 
import "./styles/adminHome.css"; 
import "./styles/agregarUsuario.css"; 
import "./styles/adminHome.css"; 

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
    <ToastContainer
      position="bottom-right"  
      autoClose={2000}         
      hideProgressBar={false}  
      newestOnTop={false}
      closeOnClick
      pauseOnHover
      theme="colored"         
    />
  </React.StrictMode>
);
