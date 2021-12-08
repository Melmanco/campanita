const express = require('express');
const mysql = require('mysql');
const cors = require('cors');
const multer = require('multer');
const mimeTypes = require('mime-types');
const http = require("http");
const nodemailer = require("nodemailer");
const storage = multer.diskStorage({
    destination: 'uploads/',
    filename: function(req,file,cb){
        cb("",Date.now() + "." + mimeTypes.extension(file.mimetype));
    }
})

const app = express();

const servidor = http.createServer(app);
const socketio = require("socket.io")
const io = socketio(servidor);

app.use(express.json());
app.use(cors());

io.on("connection", (socket) => {
  let username;

  socket.on("conectado", (nomb) => {
    username = nomb;
    //socket.broadcast.emit manda el mensaje a todos los clientes excepto al que ha enviado el mensaje
    socket.broadcast.emit("mensajes", {
      username: username,
      mensaje: `${username} ha entrado en la sala del chat`,
    });
  });

  socket.on("mensaje", (username, mensaje) => {
    //io.emit manda el mensaje a todos los clientes conectados al chat
    io.emit("mensajes", { username, mensaje });
  });

  socket.on("disconnect", () => {
    io.emit("mensajes", {
      servidor: "Servidor",
      mensaje: `${username} ha abandonado la sala`,
    });
  });
});




const db = mysql.createConnection({
    user        : 'root',
    host        : 'localhost',
    database    : 'campanita',
});

const PORT = process.env.PORT || 8080;

const upload = multer({
    storage: storage
})

app.post('/login', (req, res) => {
    const username = req.body.username;
    const password = req.body.password;

    db.query(
        "SELECT * FROM usuario WHERE RUT = ? AND contraseña = ?",
        [username, password],
        (err, result) => {
            if (err) {
                console.log(err);
                res.send({err: err});
            }

            if (result.length > 0) {
                res.send({ message: 'success'});
            } else {
                console.log('Usuario o contraseña incorrectos');
                res.send({ message: 'failure'});
            }
        }
    );
});

app.post('/files', upload.single('new_file'), (req,res) =>{
})

app.post("/send-email",(req,res)=>{
  var transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    post: 465,
    secure: true,
    auth:{
      user: "jardin.campanita.notificaciones@gmail.com",
      pass: "sceyaqwusmleyrfq",
    }
  });

  var notificacionChat = {
    from: "<jardin.campanita.notificaciones@gmail.com>",
    to: "diego.c.080808@gmail.com",
    subject: "Tiene un chat pendiente",
    text: "¡Hola Mundo!"
  }

  var notificacionCertificado = {
    from: "<jardin.campanita.notificaciones@gmail.com>",
    to: "hristo59@hotmail.cl",
    subject: "certificado alumno regular",
    text: "hristo es jei"
  }

  transporter.sendMail(notificacionCertificado,(error,info)=>{
    if(error){
      res.status(500).send(error.message);

    }
    else{
      console.log("Email enviado")
      res.status(200).jsonp(req.body);
    }
  });


});




servidor.listen(PORT, console.log(`Server started on port ${PORT}`));
