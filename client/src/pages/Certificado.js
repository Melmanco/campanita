import React, { useState,useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import Axios from 'axios';
import './Login.css'
import Logo from '../img/integra.png';

function Certificado(props){
    const {username} = props;
    const [perfil,setPerfil] = useState("");
    const [isRendered, setIsRendered] = useState(false);
    
    const Enviar = () =>{

        Axios.post("http://localhost:8080/send-email",{username: username });
    }

    useEffect(() => {
        Axios.post("http://localhost:3000/obtener-perfil", {
            username: username
        }).then((response) => {
            console.log(response.data);
            if(response.data === "Directora" || response.data === "Docente" || response.data === "Estudiante")
                setPerfil(response.data);
        });
        
        setIsRendered(true);
    });
    
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
