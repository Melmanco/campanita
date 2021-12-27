import React, { useState, useEffect } from 'react';
import { Text, Linking } from 'react-native';
import Axios from 'axios';
import '../index.css';

function Clases(props){
    const {username} = props;
    const [perfil,setPerfil] = useState("");
    const [grupo,setGrupo] = useState("");
    const [link,setLink] = useState("");
    const [titulo,setTitulo] = useState("");
    const [fecha,setFecha] = useState(null);
    const [list,setList] = useState(null);

    const handleUpload = (e) => {
        Axios.post("http://localhost:3000/guardar-clase", {
            link: link,
            titulo: titulo,
            fecha: fecha,
            grupo: grupo
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

        Axios.post("http://localhost:3000/obtener-clases", {
            grupo: grupo
        }).then((response) => {
            const classList = [];

            for (const newClass of response.data){

                classList.push(<li>
                    <Text> {newClass.titulo} </Text>
                    <Text> {newClass.fecha.substring(0,10)}  </Text>
                    <Text style={{color: 'blue'}}
                        onPress={() => Linking.openURL(newClass.link)}>
                    {newClass.link}
                    </Text>
                </li>)

            }
            setList(classList);
        });

    });

    return(
        <div className="Body">
            {perfil === 'Directora' || perfil === 'Docente'?
            <div>
                <input type="url" placeholder="Link" onChange={(e) => {setLink(e.target.value)}} />
                <input type="text" placeholder="Título" onChange={(e) => {setTitulo(e.target.value)}} />
                <input type="date" placeholder="Fecha" onChange={(e) => {setFecha(e.target.value)}} />
                <button onClick={(e)=> {handleUpload(e)}}>Publicar clase</button>
            </div>
            :
            null
            }

            <ul> {list} </ul>
        </div>
    );
}

export default Clases;