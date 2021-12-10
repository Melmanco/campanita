import React,{useState,useEffect} from 'react'
import Chat from '../components/Chat';
import io from "socket.io-client";
import Chatpro from "../components/Chatpro"

import Axios from "axios"
import "./App.css";

const socket = io.connect("http://localhost:3000");





function Contacto(props){
    const {username} = props;
    const [room,setRoom] = useState("");
    const [nombre,setNombre] = useState("");
    useEffect(() => {
        Axios.post("http://localhost:3000/obtener-nombre", {
            username: username
        }).then((response) => {
            console.log(response.data);
            setNombre(response.data);
        });
    });

    const joinRoom = () =>{
        if(room !==""){
           socket.emit("join_room",room);
        }
    };
        
    return(
        <div className="Body">
            <h3>
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
