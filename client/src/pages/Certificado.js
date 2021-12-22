import React, { useState , useEffect } from 'react';
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
            <div style={{height: 20}}></div>
            <div className={'text-certificado'} style = {{ marginLeft: "50px"}}> <div className={'text-center'}> Solicitud de certificado</div> </div>
            <div style={{height: 20}}></div>
            <div className={'text-bajada'} style = {{ marginLeft: "50px"}}> <div className={'text-center'}> Para solicitar el certificado de alumno regular presione el boton "enviar solicitud de certificado", la directora le enviara el certificado lo antes posible a su correo</div> </div>
            <div className = "row container">
                <div className = "col mt-4" > <div className={'text-center'}>
                    <button className = "btn btn-primary" onClick = {Enviar}>enviar solicitud de certificado</button>
                    </div>
                </div>
            </div>
        </div>
    );
}
export default Certificado;
