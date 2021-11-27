import React, { useState } from 'react';
import Axios from 'axios';
import './Login.css'

function Login() {

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
  
    const login = () => {
      Axios.post("http://localhost:8080/login", {
        username: username,
        password: password,
      }).then((response) => {
        console.log(response);
      });
    };

    return (
        <div className="Login">
          <header className="Login-header">
            <h1>Login</h1>
            <input 
              type="text"
              placeholder="RUT"
              onChange={(e) => {
                setUsername(e.target.value);
              }} 
            />
            <input
              type="password"
              placeholder="Contraseña"
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            />
            <h1></h1>
            <button onClick={login}> Ingresar </button>
          </header>
        </div>
      );
}

export default Login;