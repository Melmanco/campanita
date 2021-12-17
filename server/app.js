const express = require('express');
const mysql = require('mysql');
const cors = require('cors');
const multer = require('multer');
const mimeTypes = require('mime-types');
const http = require("http");
const nodemailer = require("nodemailer");

const app = express();
const {Server} = require("socket.io");

const servidor = http.createServer(app);
const socketio = require("socket.io");

app.use(express.json());
app.use(cors());

var users = []

// Server de chat ------------------------------------------------
const io = new Server(servidor,{
  cors: {
    origin: "http//localhost:3000",
    methods: ["GET","POST"],
  },
 
});

io.on("connection", (socket)=>{
  /*console.log(`User Connected: ${socket.id}`);*/

  socket.on("join_room",(data) =>{
    socket.join(data);
    console.log(`User with ID: ${socket.id} join room: ${data}`)
  });
  socket.on("send_message",(data)=>{
    socket.to(data.room).emit("receive_message",data);
  });
  socket.on("disconnect",()=>{
    /*console.log("User Disconnected",socket.id);*/
  });
});
//----------------------------------------------------------------



// MySQL----------------------------------------------------------
const db = mysql.createConnection({
    user        : 'root',
    host        : 'localhost',
    database    : 'campanita',
});

const PORT = process.env.PORT || 8080;
// ---------------------------------------------------------------


// Subida y descarga de documentos -------------------------------
const storage = multer.diskStorage({
  destination: function(req,file,cb) {
    cb(null, 'uploads')
  },
  filename: function(req,file,cb){
      cb(null, Date.now() + "-" + file.originalname);
  }
})

const upload = multer({
    storage: storage
})
// ---------------------------------------------------------------




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
            res.end();
        }
        
    );
});

app.post('/send-file', upload.single('file'), (req,res) =>{
  res.end();
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
          to: "diego.c.080808@gmail.com",
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
      res.end();
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
      res.end();
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
      res.end();
    }
  );
  
});

app.post("/obtener-grupo", (req,res) => {
  const username = req.body.username;
  
  
  db.query(
    "SELECT ID_Grupo FROM usuario, contiene WHERE usuario.RUT = contiene.RUT AND usuario.RUT = ?",
    [parseInt(username)],
    (err, result) => {
      
      if (err) {
          console.log(err);
          res.send({err: err});
      }
      
      if (result.length > 0) {
        res.send(String(result[0].ID_Grupo));
      }
      res.end();
    }
  );
  
});

app.post("/obtener-parvularias", (req,res)=>{
  const grupo = req.body.grupo;

  db.query(
    "SELECT nombre FROM usuario, contiene WHERE usuario.RUT = contiene.RUT AND Perfil = 'Docente' AND ID_Grupo = ?",
    [grupo],
    (err,result)=>{
      if(err){
        console.log(err);
        res.send({err:err});
      }
      if(result.length > 0){
        res.send(result);
      }
      res.end();
    }
  )
}
);

app.post("/obtener-alumnos",(req,res)=>{
  const grupo = req.body.grupo;

  db.query(
    "SELECT nombre FROM usuario, contiene WHERE usuario.RUT = contiene.RUT AND Perfil = 'Estudiante' AND ID_Grupo = ?",
    [grupo],
    (err,result)=>{
      if(err){
        console.log(err);
        res.send({err:err});
      }
      if(result.length > 0){
        res.send(result);
      }
      res.end();
    }
  )
});

app.post("/obtener-rut-string",(req,res)=>{
  const nombre = req.body.nombre;
  console.log(nombre)
  db.query(
    "SELECT rut FROM usuario WHERE Nombre = ?",
    [nombre],
    (err, result) => {
      
      if (err) {
          console.log(err);
          res.send({err: err});
      }
      
      if (result.length > 0) {
        console.log(result[0].rut)
        res.send(String(result[0].rut));
      }
      res.end();
    }
  )
});                                            

app.post("/obtener-mensajes",(req,res)=>{
  const remitente = req.body.remitente;
  const destinatario = req.body.destinatario;
  db.query(
    "SELECT * FROM mensaje WHERE ID_Remitente = ? and ID_Destinatario = ?",
    [remitente,destinatario],
    (err, result) => {
      if (err) {
          console.log(err);
          res.send({err: err});
      }

      if (result.length > 0) {
          res.send(result);
      }
      res.end();
    }
  )
    
});

app.post("/guarda-mensajes",(req,res)=>{
  const nombre = req.body.nombre;
  const destinatario = req.body.destinatario;
  const message = req.body.message;
  const time = req.body.time;
  console.log("1")
  db.query(
    "INSERT INTO mensaje (ID_Remitente,ID_Destinatario,Contenido,Fecha) Values (?,?,?,?)",
    [nombre,destinatario,message,time],
    (err,result)=>{
      if(err){
        console.log(err);
        res.send({err: err});
      }
      res.end();
    }
  )
});

servidor.listen(PORT, console.log(`Server started on port ${PORT}`));
