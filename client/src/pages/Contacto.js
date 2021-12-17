import React,{useState,useEffect,useLayoutEffect} from 'react'
import io from "socket.io-client";
import Chatpro from "../components/Chatpro"
import Select from 'react-select'
import Axios,{axios} from "axios"
import "./Chat.css"

const socket = io.connect("http://localhost:3000");



function Contacto(props){
    const {username} = props;

    const [room,setRoom] = useState("");
    const [nombre,setNombre] = useState("");
    const [perfil,setPerfil] = useState("");
    const [receptor,setReceptor] = useState("");
    const [rutreceptor,setRutreceptor] = useState("");
    const [showChat, setShowChat] = useState(false);
    const [grupo,setGrupo] = useState("");
    var options = []

    useEffect(() => {
        Axios.post("http://localhost:3000/obtener-nombre", {
            username: username
        }).then((response) => {
            setNombre(response.data);
        });
  
        Axios.post("http://localhost:3000/obtener-perfil",{
            username: username
        }).then((response) => {
            setPerfil(response.data);
        });

        Axios.post("http://localhost:3000/obtener-grupo",{
            username: username
        }).then((response) => {
            setGrupo(response.data);
        });

   
        if(perfil == 'Estudiante'){
            Axios.post("http://localhost:3000/obtener-parvularias",{
                grupo: grupo
            }).then((response) => {
                for(let i = 0; i < response.data.length;i++){
                    options.push({value: response.data[i].nombre ,label: response.data[i].nombre})
                }
            })
        }
        else{
            Axios.post("http://localhost:3000/obtener-alumnos",{
                grupo: grupo
            }).then((response) => {
                for(let i = 0; i < response.data.length;i++){
                    options.push({value: response.data[i].nombre ,label: response.data[i].nombre})
                }
            })
        }
    })
    
    const joinRoom = () =>{
        if(perfil == 'Estudiante'){
            
            Axios.post("http://localhost:3000/obtener-rut-string",{nombre: receptor}).then((response)=>{
                setRutreceptor(response.data)
            });
            var nombre_sala =receptor+nombre
            setRoom(nombre_sala)
            socket.emit("join_room",nombre_sala)
            setShowChat(true);


        }
        else{
            
            Axios.post("http://localhost:3000/obtener-rut-string",{nombre: receptor}).then((response)=>{
                setRutreceptor(response.data)
                
            })
            var nombre_sala =nombre+receptor
            setRoom(nombre_sala)
            socket.emit("join_room",nombre_sala)
            setShowChat(true);
            
        }
    };
    const valores = (e) =>{
        setReceptor(e.value)
    }
    return(
        <div className="Body">
            {!showChat ? (
                <div className = "joinChatContainer">
                    <h3> Unirse a un chat</h3>
                    <Select 
                        options={options} 
                        onChange={valores}
                        />
                
                    <button onClick ={joinRoom}>Unirse a la sala</button>

                </div>
            ) : (
                     <Chatpro socket={socket} nombre = {nombre} recibe = {receptor} room = {room} from = {username} to = {parseInt(rutreceptor)}/>
                )}

        </div>
    );
}

export default Contacto;
