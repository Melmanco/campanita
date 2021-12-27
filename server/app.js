const express = require('express');
const mysql = require('mysql');
const cors = require('cors');
const multer = require('multer');
const mimeTypes = require('mime-types');
const http = require("http");
const nodemailer = require("nodemailer");
const path = require('path');

const app = express();
const {Server} = require("socket.io");

const servidor = http.createServer(app);
const socketio = require("socket.io");

app.use(express.json());
app.use(cors());






// MySQL----------------------------------------------------------
const db = mysql.createConnection({
    user              : 'root',
    host              : 'localhost',
    database          : 'campanita',
    multipleStatements: true
});

const PORT = process.env.PORT || 8080;
// --------------------------------------------------------------




//login revisando los datos de la base de datos-------------------
app.post('/descargar-documento', (req,res) => {
  const options = {
    root: path.join(__dirname)
  };

  res.sendFile('uploads/' + req.body.ruta, options);
  res.end();
});

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
//--------------------------------------------------------------




//Funciones Mysql para la reloleccion de datos de los usuarios----

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


//----------------------------------------------------------------


// Server de chat ------------------------------------------------
var users = []
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




//Funciones para el Chat------------------------------------------
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


app.post("/obtener-mensajes",(req,res)=>{
  const remitente = req.body.remitente;
  const destinatario = req.body.destinatario;
  db.query(
    "SELECT * FROM mensaje WHERE ID_Remitente = ? AND ID_Destinatario = ? OR ID_Remitente = ? AND ID_Destinatario = ?",
    [remitente,destinatario,destinatario,remitente],
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

app.post("/notificacion-chat",(req,res)=>{
  const remitente = req.body.remitente;
  const destinatario = req.body.destinatario;
  db.query(
    "SELECT * from usuario Where Rut = ? or Rut = ?",
    [destinatario,remitente],
    (err,result)=>{

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
          to: result[1].Email,
          subject: "Chat",
          text: "El "+ result[0].Perfil + " " + result[0].Nombre + " te ha enviado un mensaje." 
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
      res.end()
    }
  )

});

//----------------------------------------------------------------






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




app.post('/subir-documento', upload.single('file'), (req,res) => {

  db.query(
    "INSERT INTO documento (Ruta, Fecha) VALUES (?,?); INSERT INTO descarga (ID_Grupo) VALUES (?)",
    [req.file.filename, req.body.date, req.body.grupo],
    (err, result) => {
      
      if (err) {
          console.log(err);
          res.send({err: err});
      }
      
      res.end();
  });
});

app.post('/obtener-documentos', (req,res) => {

  db.query("SELECT ruta FROM documento, descarga WHERE documento.ID_Documento = descarga.ID_Documento AND ID_Grupo = ?",
  [req.body.grupo],
  (err, result) => {
    if(err){
      console.log(err);
      res.send({err:err});
    }
    if(result.length > 0){
      res.send(result);
    }
    res.end();
  });
});


// Mandar mails de certificados a la directora-------------------------------
app.post("/send-email",(req,res) => {
  const username = req.body.username
  const opcion = req.body.opcion
  db.query(
    "SELECT * FROM usuario WHERE RUT = ?",
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
      
      
        if(opcion == '1'){
          var notificacionCertificado = {
          from: "<jardin.campanita.notificaciones@gmail.com>",
          to: "diego.c.080808@gmail.com",
          subject: "Certificado Alumno Regular",
          text: "El estudiante " + result[0].Nombre + " ha solicitado un certificado de alumno regular \n su mail es " + result[0].Email 
          }
        }
        else{
          var notificacionCertificado = {
            from: "<jardin.campanita.notificaciones@gmail.com>",
            to: "diego.c.080808@gmail.com",
            subject: "Certificado Alumno Regular",
            text: "El estudiante " + result[0].Nombre + " ha solicitado un certificado de alumno regular impreso \n enviar fecha de cuando el certificado esta listo a " + result[0].Email 
          }
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

// ---------------------------------------------------------------

//Funciones para Anuncios y Calendarios---------------------------
app.get("/obtener-anuncios",(req, res) => {
  db.query('SELECT * from anuncio', (err, result) => {

    if (err) {
      console.log(err);
      res.send({err: err});
    }
  
    if (result.length > 0) {
      res.send(result);
    }
    res.end()
  })
});

app.post("/guardar-anuncio",(req, res) => {
  const title = req.body.title;
  const start = req.body.start;
  const end = req.body.end;
  console.log("inserta anuncio")
  db.query('INSERT INTO anuncio(title,start,end) VALUES (?,?,?)',
    [title,start,end],
    (err, result) => {

      if (err) {
        console.log(err);
        res.send({err: err});
      }

      if (result.length > 0) {
        res.send(result);
      }
      res.end()
    })
});

app.post("/eliminar-anuncio",(req,res)=>{
  const start = req.body.start.slice(0,-14);
  const end = req.body.end.slice(0,-14);

  db.query('DELETE from anuncio where start = ? and end = ?',
    [start,end], 
    (err,result)=>{
      if(err){
        console.log(err);
        res.send({err:err});
      }
    res.end()
  })
});

// ---------------------------------------------------------------



//Funciones para clases-------------------------------------------
app.post("/guardar-clase", (req,res) => {
  const titulo = req.body.titulo;
  const link = req.body.link;
  const fecha = req.body.fecha;
  const grupo = req.body.grupo;

  db.query(
    "INSERT INTO clase (Titulo, Link, Fecha) VALUES (?,?,?); INSERT INTO asiste (ID_Grupo) VALUES (?)",
    [titulo, link, fecha, grupo],
    (err,result) => {
      if (err) {
        console.log(err);
        res.send({err: err});
      }
    
      res.end();
    }
  );

});

app.post("/obtener-clases", (req,res) => {
  const grupo = req.body.grupo;

  db.query(
    "SELECT titulo, fecha, link FROM clase, asiste WHERE clase.ID_Clase = asiste.ID_Clase AND ID_Grupo = ?",
    [grupo],
    (err, result) => {
      if(err){
        console.log(err);
        res.send({err:err});
      }
      if(result.length > 0){
        res.send(result);
      }
      res.end();
    });

});
// ---------------------------------------------------------------


servidor.listen(PORT, console.log(`Server started on port ${PORT}`));
