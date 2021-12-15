import React,{useState,useEffect,useLayoutEffect} from 'react'
import io from "socket.io-client";
import Chatpro from "../components/Chatpro"
import Select from 'react-select'
import Axios from "axios"

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
    var options = []

    useLayoutEffect(() => {
        Axios.post("http://localhost:3000/obtener-nombre", {
            username: username
        }).then((response) => {
            setNombre(response.data);
        });
  


        Axios.post("http://localhost:3000/obtener-perfil",{
            username: username
        }).then((response) => {
            setPerfil(response.data);
        })

   
        if(perfil == 'Estudiante'){
            Axios.get("http://localhost:3000/obtener-parvularias").then((response) => {
                for(let i = 0; i < response.data.length;i++){
                    options.push({value: response.data[i].nombre ,label: response.data[i].nombre})
                }
            })
        }
        else{
            console.log("funciona el log? ")
            Axios.get("http://localhost:3000/obtener-alumnos").then((response) => {
                for(let i = 0; i < response.data.length;i++){
                    options.push({value: response.data[i].nombre ,label: response.data[i].nombre})
                    console.log(response.data)
                }
            })
        }
    })
    
    const crearSala = (parvu,alumno) =>{
        setSala(parvu+alumno)
        setRoom(sala)
        socket.emit("join_room", room);

    }
    const joinRoom = () =>{
        if(perfil == 'Estudiante'){
            Axios.post("http://localhost:3000/obtener-rut-string",{nombre: receptor}).then((response)=>{
                setRutreceptor(response.data)
            });
            crearSala(receptor,String(username));
        }
        else if(perfil == 'Docente'){
            
            Axios.post("http://localhost:3000/obtener-rut-string",{nombre: receptor}).then((response)=>{
                setRutreceptor(response.data)
            })
            crearSala(String(username),receptor);
        }
    };
    const valores = (e) =>{
        setReceptor(e.value)
    }
    return(
        <div className="Body">
            <h3>

                <Select 
                options={options} 
                onChange={valores}
                />
                
                <button onClick ={joinRoom}>Unirse a la sala</button>


                <Chatpro socket={socket} username = {nombre} room = {room}/>

            </h3>
        </div>
    );
}

export default Contacto;
