import Axios from "axios";
import React, { useEffect, useState } from "react";
import ScrollToBottom from "react-scroll-to-bottom";

function Chat(props) {
  const [currentMessage, setCurrentMessage] = useState("");
  const [messageList, setMessageList] = useState([]);
  const [primera,setPrimera] = useState(true);
  const {socket,nombre,recibe,room,from,to} = props
  
  useEffect(()=>{
    Axios.post("http://localhost:3000/obtener-mensajes",{remitente: from,destinatario: to}).then((response)=>{
      if(primera){
        for(let i = 0;i < response.data.length ;i++){
          if(response.data[i].ID_Remitente == from){
            var antiguos = {
              room: room,
              author: nombre,
              message: response.data[i].Contenido,
              time: response.data[i].Fecha.slice(11,-8)
            }
          }
          else{
            var antiguos = {
              room: room,
              author: recibe,
              message: response.data[i].Contenido,
              time: response.data[i].Fecha.slice(11,-8)
            }

          }
        setMessageList((list) => [...list, antiguos]);
          
          
          }
        setPrimera(false);
        }
    });
});
  



  const sendMessage = async () => {
    if (currentMessage !== "") {
      const messageData = {
        room: room,
        author: nombre,
        message: currentMessage,
        time:
          new Date(Date.now()).getHours() +
          ":" +
          new Date(Date.now()).getMinutes(),
      };

      var mysql_date = new Date(Date.now()).toISOString().slice(0, 19).replace('T', ' ');

      await socket.emit("send_message", messageData);
      setMessageList((list) => [...list, messageData]);

      Axios.post("http://localhost:3000/guarda-mensajes",{nombre: from, destinatario: to,message: currentMessage,time: mysql_date})
      setCurrentMessage("");
    }
  };

  useEffect(() => {
    socket.on("receive_message", (data) => {
      setMessageList((list) => [...list, data]);
    });
  }, [socket]);

  return (
    <div className="chat-window">
      <div className="chat-header">
        <p>Mensajes</p>
      </div>
      <div className="chat-body">
        <ScrollToBottom className="message-container">
          {messageList.map((messageContent) => {
            return (
              <div
                className="message"
                id={nombre === messageContent.author ? "other" : "you"}
              >
                <div>
                  <div className="message-content">
                    <p>{messageContent.message}</p>
                  </div>
                  <div className="message-meta">
                    <p id="time">{messageContent.time}</p>
                    <p id="author">{messageContent.author}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </ScrollToBottom>
      </div>
      <div className="chat-footer">
        <input
          type="text"
          value={currentMessage}
          placeholder="Hey..."
          onChange={(event) => {
            setCurrentMessage(event.target.value);
          }}
          onKeyPress={(event) => {
            event.key === "Enter" && sendMessage();
          }}
        />
        <button onClick={sendMessage}>&#9658;</button>
      </div>
    </div>
  );
}

export default Chat;
