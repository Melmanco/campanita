import Axios  from "axios";
import React, { useEffect, useState } from "react";
import ScrollToBottom from "react-scroll-to-bottom";

function Chat({ socket, username, room ,from,to}) {
  const [currentMessage, setCurrentMessage] = useState("");
  const [messageList, setMessageList] = useState([]);

  const sendMessage = async () => {
    if (currentMessage !== "") {
      const messageData = {
        room: room,
        author: username,
        message: currentMessage,
        time:
          new Date(Date.now()).getHours() +
          ":" +
          new Date(Date.now()).getMinutes(),
        timedata: new Date
      };

      await socket.emit("send_message", messageData);
      setMessageList((list) => [...list, messageData]);
      var date_mysql = messageData.timedata.getUTCFullYear() + '-' +
      ('00' + (messageData.timedata.getUTCMonth()+1)).slice(-2) + '-' +
      ('00' + messageData.timedata.getUTCDate()).slice(-2) + ' ' + 
      ('00' + messageData.timedata.getUTCHours()).slice(-2) + ':' + 
      ('00' + messageData.timedata.getUTCMinutes()).slice(-2) + ':' + 
      ('00' + messageData.timedata.getUTCSeconds()).slice(-2);

      Axios.post("http://localhost:3000/guarda-mensajes",{username: from,destinatario: to,message:messageData.message,time : date_mysql});

      setCurrentMessage("");
    }
  };
  useEffect(()=>{
    Axios.post("http://localhost:3000/obtener-mensajes",{
      remitente: from,
      destinatario: to
    }).then((response)=>{
      var bdmensajes = 
    })
 });



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
                id={username === messageContent.author ? "you" : "other"}
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
