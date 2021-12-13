import React,{useState,useEffect} from 'react'
import Chat from '../components/Chat';
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

    var options = []

    useEffect(() => {
        Axios.post("http://localhost:3000/obtener-nombre", {
            username: username
        }).then((response) => {
            console.log(response.data);
            setNombre(response.data);
        });
    });

    useEffect(()=>{
        Axios.post("http://localhost:3000/obtener-perfil",{
            username: username
        }).then((response) => {
            setPerfil(response.data);
        })

    });
    useEffect(()=>{
    

        if(perfil == 'Estudiante'){
            
            Axios.get("http://localhost:3000/obtener-parvularias").then((response) => {
                for(let i = 0; i < response.data.length;i++){
                    options.push({value: response.data[i].nombre ,label: response.data[i].nombre})
                }
            })
        }
        else{
            Axios.get("http://localhost:3000/obtener-alumnos").then((response) => {
                for(let i = 0; i < response.data.length;i++){
                    options.push({value: response.data[i].nombre ,label: response.data[i].nombre})
                }
            })
        }
    });
    


    const joinRoom = () =>{
        if(room !==""){
           socket.emit("join_room",room);
        }
    };

    return(
        <div className="Body">
            <h3>
                <Select options={options} />
                <input 
                    type="text"
                    placeholder="parvularia..."
                    onChange={(event)=>{
                        setRoom(event.target.value)
                    }}
                />
                
                <button onClick ={joinRoom}>Unirse a la sala</button>
                <Chatpro socket={socket} username = {nombre} room = {room}/>

            </h3>
        </div>
    );
}

export default Contacto;
