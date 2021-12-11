import React, { useState } from 'react';
import { Navigate } from 'react-router-dom';
import Axios from 'axios';
import './Login.css'
import Logo from '../img/integra.png';
const md5 = require('md5');

function Login(props) {

    const {loginStatus, setLoginStatus, username, setUsername} = props
    const [password, setPassword] = useState("");
  
    const login = (e) => {
      e.preventDefault();
      Axios.post("http://localhost:8080/login", {
        username: username,
        password: password,
      }).then((response) => {
        if(response.data.message === 'success'){
          setUsername(username);
          setLoginStatus(true);
        }
        else{
          setLoginStatus(false);
        }
      });
    };

    if(loginStatus)
      return <Navigate to='/home'/>;

    return (
        <div className='Login'>
          <header className='Login-header'>
            <div className='text-center'>
              <img src={Logo} class='img-fluid'/>
            </div>
            <h1>Iniciar sesión</h1>
            <input 
              type='text'
              placeholder='RUT'
              onChange={(e) => {
                setUsername(e.target.value);
              }} 
            />
            <input
              type='password'
              placeholder='Contraseña'
              onChange={(e) => {
                setPassword(md5(e.target.value));
              }}
            />
            <h1></h1>
            <button onClick={login}> Ingresar </button>
          </header>
        </div>
      );
}

export default Login;