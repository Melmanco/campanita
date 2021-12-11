import React, { useState, useEffect } from 'react';
import Axios from 'axios';
import Uploader from '../components/Uploader';
import '../index.css';

function Files(props){
    const {username} = props;
    const [perfil,setPerfil] = useState("");
    
    useEffect(() => {
        Axios.post("http://localhost:3000/obtener-perfil", {
            username: username
        }).then((response) => {
            console.log(response.data);
            if(response.data === "Directora" || response.data === "Docente" || response.data === "Estudiante")
                setPerfil(response.data);
        });
    });
    
    return(
        <div className="Body">
            {perfil === 'Directora' || perfil === 'Docente'?
            <Uploader/>
            :
            null
            }
        </div>
    );
}

export default Files;
