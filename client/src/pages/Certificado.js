import React, { useState , useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import Axios from 'axios';
import './Login.css'
import Logo from '../img/integra.png';
import swal from 'sweetalert';
function Certificado(props){
    const {username} = props;
    const [perfil,setPerfil] = useState("");
    const [isRendered, setIsRendered] = useState(false);
    const [spam,setSpam] = useState(true);
    const [alerta,setAlerta] = useState(false);
    

    const Enviar1 = () =>{
        if(spam){
            swal({
                title: "Certificado Digital",
                text: "¿Estas seguro de solicitar Certificado Digital?",
                icon: "info",
                buttons: ["No","Si"]
            }).then(respuesta =>{
                if(respuesta){
                    swal({
                        title: "has enviado la solicitud",
                        icon: "success"
                    })
                    Axios.post("http://localhost:8080/send-email",{username: username,opcion: '1' });
                    setSpam(false);
                }
            })
            
        }
    }
    const Enviar2 = () =>{
        if(spam){
            swal({
                title: "Certificado Impreso",
                text: "¿Estas seguro de solicitar Certificado Impreso?",
                icon: "info",
                buttons: ["No","Si"]
            }).then(respuesta =>{
                if(respuesta){
                    swal({
                        title: "has enviado la solicitud",
                        icon: "success"
                    })
                    Axios.post("http://localhost:8080/send-email",{username: username,opcion: '2' });
                    setSpam(false);
                }
            })
            
        }
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
            <div className='tamanoImagen'> 
                <img src={process.env.PUBLIC_URL + `/imgSlide/boton.jpg`}/>
            </div>
            
            <button className = "certificado" onClick = {Enviar1}>enviar solicitud de certificado digital</button>
            <button className = "certificado" onClick = {Enviar2}>enviar solicitud de certificado impreso</button>
    
        </div>
    );
}
export default Certificado;
