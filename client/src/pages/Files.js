import React, { useState, useEffect } from 'react';
import Axios from 'axios';
import '../index.css';

function Files(props){
    const {username} = props;
    const [perfil,setPerfil] = useState("");
    const [grupo,setGrupo] = useState("");
    const [file,setFile] = useState(null);

    const handleFile = (e) => {
        setFile(e.target.files[0]);
    };

    const handleUpload = (e) => {
        const formData = new FormData();
        const mysql_date = new Date(Date.now()).toISOString().slice(0, 19).replace('T', ' ');

        formData.append('file',file);
        formData.append('grupo',grupo);
        formData.append('date',mysql_date);

        Axios.post(
            "http://localhost:3000/send-file",
            formData,
            {
                headers: {
                    'Content-type': 'multipart/form-data'
                }
            }
        );
    }

    useEffect(() => {
        Axios.post("http://localhost:3000/obtener-perfil", {
            username: username
        }).then((response) => {
            console.log(response.data);
            if(response.data === "Directora" || response.data === "Docente" || response.data === "Estudiante")
                setPerfil(response.data);
        });

        Axios.post("http://localhost:3000/obtener-grupo",{
            username: username
        }).then((response) => {
            setGrupo(response.data);
        });
    });
    
    return(
        <div className="Body">
            {perfil === 'Directora' || perfil === 'Docente'?
            <div>
                <input type="file" onChange={(e) => {handleFile(e)}} />
                <button onClick={(e)=> {handleUpload(e)}}>Enviar</button>
            </div>
            :
            null
            }
        </div>
    );
}

export default Files;
