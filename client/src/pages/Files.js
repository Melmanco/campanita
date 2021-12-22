import React, { useState, useEffect } from 'react';
import Axios from 'axios';
import '../index.css';
import downloadButton from '../img/download.png';

function Files(props){
    const {username} = props;
    const [perfil,setPerfil] = useState("");
    const [grupo,setGrupo] = useState("");
    const [file,setFile] = useState(null);
    const [list,setList] = useState(null);

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
            "http://localhost:3000/subir-documento",
            formData,
            {
                headers: {
                    'Content-type': 'multipart/form-data'
                }
            }
        );
    }

    const handleDownload = (ruta) => {
        Axios({
            url: "http://localhost:3000/descargar-documento",
            method: "POST",
            responseType: "blob",
            data:{
                ruta: ruta
            },
        }).then((response) =>{
            const url = window.URL.createObjectURL(new Blob([response.data]));
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', ruta);
            link.click();
            window.URL.revokeObjectURL(url);
        });
    }

    useEffect(() => {
        Axios.post("http://localhost:3000/obtener-perfil", {
            username: username
        }).then((response) => {
            if(response.data === "Directora" || response.data === "Docente" || response.data === "Estudiante")
                setPerfil(response.data);
        });

        Axios.post("http://localhost:3000/obtener-grupo",{
            username: username
        }).then((response) => {
            setGrupo(response.data);
        });

        Axios.post("http://localhost:3000/obtener-documentos",{
            grupo: grupo
        }).then((response) => {
            const fileList = [];
            for (const newFile of response.data) {
                fileList.push(<li key={newFile.ruta}>
                    {newFile.ruta}
                    <button onClick={() => handleDownload(newFile.ruta)} className="clickBox">
                        <img className="download_icon" src={downloadButton} style={{width: '24px', height: '24px'}}/>
                    </button>
                </li>)
            }
            setList(fileList);
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

            <lu> {list} </lu>
        </div>
    );
}

export default Files;
