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
const {Server} = require("socket.io");

const servidor = http.createServer(app);
const socketio = require("socket.io");

app.use(express.json());
app.use(cors());

const io = new Server(servidor,{
  cors: {
    origin: "http//localhost:3000",
    methods: ["GET","POST"],
  },

});

io.on("connection", (socket)=>{
  console.log(`User Connected: ${socket.id}`);

  socket.on("join_room",(data) =>{
    socket.join(data);
    console.log(`User with ID: ${socket.id} join room: ${data}`)
  });
  socket.on("send_message",(data)=>{
    socket.to(data.room).emit("receive_message",data);
  });
  socket.on("disconnect",()=>{
    console.log("User Disconnected",socket.id);
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

app.post('/send-file', upload.single('file'), (req,res) =>{
});

app.post("/send-email",(req,res)=>{
  const username = req.body.username
  db.query(
    "SELECT nombre FROM usuario WHERE RUT = ?",
    [username],
    (err, result) => {
      if (err) {
        console.log(err);
        res.send({err: err});
      }

      if (result.length > 0) {
        var transporter = nodemailer.createTransport({
          host: "smtp.gmail.com",
          post: 465,
          secure: true,
          auth:{
            user: "jardin.campanita.notificaciones@gmail.com",
            pass: "sceyaqwusmleyrfq",
          }
        });
      
        var notificacionCertificado = {
          from: "<jardin.campanita.notificaciones@gmail.com>",
          to: "felipe.maldonado19@outlook.com",
          subject: "Certificado Alumno Regular",
          text: "El estudiante " + result[0].nombre + " ha solicitado un certificado de alumno regular." 
        }
      
        transporter.sendMail(notificacionCertificado,(error,info)=>{
          if(error){
            res.status(500).send(error.message);
      
          }
          else{
            console.log("email enviado")
            res.status(200).jsonp(req.body);
          }
        });
      
      }
    }
  );

 

});

app.post("/obtener-perfil", (req,res) => {
  const username = req.body.username;
  
  
  db.query(
    "SELECT perfil FROM usuario WHERE RUT = ?",
    [username],
    (err, result) => {
      
      if (err) {
          console.log(err);
          res.send({err: err});
      }
      
      if (result.length > 0) {
        res.send(result[0].perfil);
      }
    }
  );
  
});

app.post("/obtener-nombre", (req,res) => {
  const username = req.body.username;
  
  
  db.query(
    "SELECT nombre FROM usuario WHERE RUT = ?",
    [username],
    (err, result) => {
      
      if (err) {
          console.log(err);
          res.send({err: err});
      }
      
      if (result.length > 0) {
        res.send(result[0].nombre);
      }
    }
  );
  
});
app.get("/calendario",(req, res) => {

      db.query('SELECT * from calendario', (err, result) => {

        if (err) {
          console.log(err);
          res.send({err: err});
      }
      
      if (result.length > 0) {
        res.send(result);
      }
      })
  });

app.post("/calendario",(req, res) => {
    const title = req.body.title
    const start = req.body.start
    const end = req.body.end
    db.query('INSERT INTO calendario(title,start,end) VALUES (?,?,?)',[title,start,end], (err, result) => {
    
      if (err) {
        console.log(err);
        res.send({err: err});
      }
    
      if (result.length > 0) {
        res.send(result);
      }
    })
});

app.post("/no-calendario",(req,res)=>{
  const start = req.body.start
  const end = req.body.end
  hola = start.slice(0,-14)
  chao = end.slice(0,-14)
  console.log(hola)
  console.log(chao)
  db.query('DELETE from calendario where start = ? and end = ?',
  [hola,chao],
  (err,result)=>{
    if(err){
      console.log(err);
      res.send({err:err});
    
    }
  }
  )
});

servidor.listen(PORT, console.log(`Server started on port ${PORT}`));
