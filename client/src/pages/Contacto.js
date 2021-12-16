import React,{useState,useEffect,useLayoutEffect} from 'react'
import io from "socket.io-client";
import Chatpro from "../components/Chatpro"
import Select from 'react-select'
import Axios,{axios} from "axios"

const socket = io.connect("http://localhost:3000");



function Contacto(props){
    const {username} = props;

    const [room,setRoom] = useState("");
    const [nombre,setNombre] = useState("");
    const [perfil,setPerfil] = useState("");
    const [receptor,setReceptor] = useState("");
    const [rutreceptor,setRutreceptor] = useState("");
    const [sala,setSala] = useState("");
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
            console.log(grupo)
            Axios.post("http://localhost:3000/obtener-parvularias",{
                grupo: grupo
            }).then((response) => {
                for(let i = 0; i < response.data.length;i++){
                    options.push({value: response.data[i].nombre ,label: response.data[i].nombre})
                }
            })
        }
        else{
            console.log(grupo);
            Axios.post("http://localhost:3000/obtener-alumnos",{
                grupo: grupo
            }).then((response) => {
                for(let i = 0; i < response.data.length;i++){
                    options.push({value: response.data[i].nombre ,label: response.data[i].nombre})
                }
            })
        }
    })
    
    const crearSala = (parvu,alumno) =>{
        console.log(parvu,alumno)
        setSala(parvu+alumno)
        setRoom(sala)
        socket.emit("join_room", room);

    }
    
    const joinRoom = () =>{
        if(perfil == 'Estudiante'){
            
            Axios.post("http://localhost:3000/obtener-rut-string",{nombre: receptor}).then((response)=>{
                setRutreceptor(response.data)
            });
            crearSala(receptor,nombre);
            setShowChat(true);

        }
        else{
            
            Axios.post("http://localhost:3000/obtener-rut-string",{nombre: receptor}).then((response)=>{
                setRutreceptor(response.data)
                
            })
            crearSala(nombre,receptor);
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
                     <Chatpro socket={socket} username = {nombre} room = {room} from = {username} to = {parseInt(rutreceptor)}/>
                )}

        </div>
    );
}

export default Contacto;
