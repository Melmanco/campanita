import React, { useState } from 'react';
import { Navigate } from 'react-router-dom';
import Axios from 'axios';
import './Login.css'
import Logo from '../img/integra.png';

function Certificado(props){
    const {username} = props
    const Enviar = () =>{

        Axios.post("http://localhost:8080/send-email");
    }

    
    return(

        <div className="Body">
            <div className = "row container">
                <div className = "col mt-4">

                    <button className = "btn btn-primary" onClick = {Enviar}>enviar certificado</button>

                </div>
            </div>
        </div>
    );
}
export default Certificado;
