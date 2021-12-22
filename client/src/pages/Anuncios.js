import React from 'react';
import '../index.css';
import {Calendario} from '../components/Calendario.js'

function Anuncios(props){
    const {username} = props

    return(
        <div className="Body" >
            <div style={{height: 20}}></div>
            <div className={'text-shortest'}> <div className={'text-center'}> Calendario </div></div>
            <Calendario username={username}/>
            
        </div>
    );
}

export default Anuncios;