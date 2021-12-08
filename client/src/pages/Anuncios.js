import React from 'react';
import '../index.css';
import {Calendario} from '../components/Calendario.jsx'
function Anuncios(props){
    const {username} = props
    return(
        <div className="Body">
            <Calendario/>           
        </div>
    );
}

export default Anuncios;
