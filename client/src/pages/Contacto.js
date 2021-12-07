import React from 'react';
import '../index.css';
import Chat from '../components/Chat';
function Contacto(props){
    const {username} = props
    return(
        <div className="Body">
            <Chat username ={username}/>            
        </div>
    );
}

export default Contacto;
