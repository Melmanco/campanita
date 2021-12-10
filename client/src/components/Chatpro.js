import React,{useState} from 'react'

function Chatpro({socket,username,room}){
    const [currentMessage,setCurrentMessage] = useState("");
    
    const sendMessage=()=>{
        if (currentMessage !== ""){
            const messageData = {
                room: room,
                author: username,
                message: currentMessage,
                time: new Date(date.now()).getHours() + ":" + Date(date.now()).getHours()  
            }
        }
    }
    return(
        <div>
            <div className ="chat-header">
                <p>Mensajes</p>
            </div>

            <div className ="chat-body"></div>
            <div className ="chat-footer">
                <input
                    type = "text" 
                    placeholder="Hey"
                    onChange={(event)=>{
                        setCurrentMessage(event.targe.value);
                    }
                    }
                />
                <button>&#9658;</button>
            </div>
        </div>
    )
}

export default Chatpro;
