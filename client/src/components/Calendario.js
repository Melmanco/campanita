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
import "../index.css"
import { is } from 'date-fns/locale';
import swal from 'sweetalert';
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
    const {username} = props;
    const [perfil,setPerfil] = useState("");
    const [isRendered, setIsRendered] = useState(false);
    const [isChanged, setChanged] = useState(true);

    useEffect(() => {
        console.log(isChanged);
        Axios.get("http://localhost:8080/obtener-anuncios").then( (response) =>{
            
            if(response.status === 200){
                
                setAllEvents(response.data)
            }
        })

        Axios.post("http://localhost:3000/obtener-perfil", {
            username: username
        }).then((response) => {
            if(response.data === "Directora" || response.data === "Docente" || response.data === "Estudiante")
                setPerfil(response.data);
        });
        
        setIsRendered(true);
        setChanged(false);

    },[isChanged]);



    const  handleAddEvent = async () => {
        swal({
            title: "Crear Anuncio",
            text: "¿Estas segura de crear un nuevo Anuncio?",
            icon: "info",
            buttons: ["No","Si"]
        }).then(respuesta =>{
                if(respuesta){
                    var fecha = new Date(newEvent.start)
                    fecha.setDate(fecha.getDate()+1);
                    Axios.post("http://localhost:8080/guardar-anuncio",{
                        title: newEvent.title,
                        start: newEvent.start,
                        end: fecha
                    }).then( (response) =>{
                        if(response.status === 200){
                            
                            console.log("hola")
                        }
                    })
                    setChanged(isChanged => !isChanged)
            }
    })
    }




    const handleDelEvent = async () => {
        swal({
            title: "Eliminar Anuncio",
            text: "¿Estas segura de eliminar el Anuncio en esta fecha?",
            icon: "info",
            buttons: ["No","Si"]
        }).then(respuesta =>{
            if(respuesta){
                var fecha = new Date(newEvent.start)
                fecha.setDate(fecha.getDate()+1);
                Axios.post("http://localhost:8080/eliminar-anuncio",{
                    start: newEvent.start,
                    end: fecha

                }).then((response)=>{
                    
                    if(response.status == 200){
                        console.log("chao")
                    }
                })
                setChanged(isChanged => !isChanged)
        }
    })
    }


    if (!isRendered)
        return(<div/>);
    else if (perfil === "Estudiante" || perfil === "" || perfil ==="Docente"){

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
            <div className="Body">
                <h2 className = "añadir-rectangulo" style={{ marginLeft: "25px" }}> <div className={'text-center'}> Añadir nuevo evento</div></h2>
                <div style={{ marginLeft: "25px" }}>
                    <input type="text" placeholder="Titulo" style={{ width: "17.3333%", marginRight: "10px" }} value={newEvent.title} onChange={(e) => setNewEvent({ ...newEvent, title: e.target.value })} />
                    <div className="customDatePickerWidth">
                        <DatePicker placeholderText="Fecha evento" style={{ width: "28%", marginRight: "10px" }} selected={newEvent.start} onChange={(start) => setNewEvent({ ...newEvent, start })} />
                    </div>
                    <button className = "btn btn-primary" style={{width: "13%", marginTop: "10px",marginBottom: "20px" }} onClick={handleAddEvent}>
                        Añadir evento
                    </button>


                    <button className = "btn btn-primary" style={{width: "13%" ,marginTop: "10px",marginBottom: "20px",marginLeft: "25px"  }} onClick={handleDelEvent} >
                        Borrar evento
                    </button>
                </div>
                <Calendar 
                    localizer={localizer} 
                    events={allEvents}
                    startAccessor="start" 
                    endAccessor="end" 
                    style={{ height: 500, marginLeft: "75px", marginRight: "75px", backgroundColor: "#f0f0f0"}} 
                />
                <div style={{height: 75}}></div>
            </div>)
    }
};