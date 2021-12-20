import React, { useState,useEffect } from 'react';
import format from "date-fns/format";
import getDay from "date-fns/getDay";
import parse from "date-fns/parse";
import startOfWeek from "date-fns/startOfWeek";
import { Calendar, dateFnsLocalizer } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Axios from 'axios';
const locales = {
    "en-US": require("date-fns/locale/en-US")
} 

const localizer = dateFnsLocalizer ({
    format,
    parse,
    startOfWeek,
    getDay,
    locales
})





export function Calendario(props) {
    const [newEvent, setNewEvent] = useState({ title: "" , start: "", end: "" });
    const [allEvents, setAllEvents] = useState([]);


    useEffect(() => {
        Axios.get("http://localhost:8080/calendario").then( (response) =>{
            
            if(response.status === 200){
            
                setAllEvents(response.data)
            }
        })
    }, [])
    console.log(allEvents)


    const {username} = props;
    const [perfil,setPerfil] = useState("");
    const [isRendered, setIsRendered] = useState(false);
    
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



   

    function handleAddEvent() {
        console.log(newEvent.start)
        console.log(newEvent.end)
        Axios.post("http://localhost:8080/calendario",{
            title: newEvent.title,
            start: newEvent.start,
            end: newEvent.end
        }).then( (response) =>{
            
            if(response.status === 200){
            
                console.log("hola")
            }
        })
        
    }
    function borrar(){
        Axios.post("http://localhost:8080/no-calendario",{
            start: newEvent.start,
            end: newEvent.end

        }).then((response)=>{
            if(response.status == 200){
                console.log("chao")
            }
        })
    }


    if (!isRendered)
        return(<div/>);
    else if (perfil === "Estudiante"){

        return (
            <div className="Calendar">
                <Calendar 
                    localizer={localizer} 
                    events={allEvents} 
                    startAccessor="start" 
                    endAccessor="end" 
                    style={{ height: 500, margin: "50px", backgroundColor: "#f0f0f0" }} 
                />
            </div>)
    }
    else {
        return (
            <div className="Calendar">
                <h1>Calendario</h1>
                <h2>Añadir nuevo evento</h2>
                <div>
                    <input type="text" placeholder="Titulo" style={{ width: "20%", marginRight: "10px" }} value={newEvent.title} onChange={(e) => setNewEvent({ ...newEvent, title: e.target.value })} />
                    <DatePicker placeholderText="Dia inicio" style={{ marginRight: "10px" }} selected={newEvent.start} onChange={(start) => setNewEvent({ ...newEvent, start })} />
                    <DatePicker placeholderText="Dia termino" selected={newEvent.end} onChange={(end) => setNewEvent({ ...newEvent, end })} />
                    <button stlye={{ marginTop: "10px" }} onClick={handleAddEvent}>
                        Añadir evento
                    </button>


                    <button stlye={{ marginTop: "10px" }} onClick={borrar} >
                        Borrar evento
                    </button>
                </div>
                <Calendar 
                    localizer={localizer} 
                    events={allEvents} 
                    startAccessor="start" 
                    endAccessor="end" 
                    style={{ height: 500, margin: "50px", backgroundColor: "#f0f0f0"}} 
                />
            </div>)
    }
};



