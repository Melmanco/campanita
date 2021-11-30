const express = require('express');
const mysql = require('mysql');
const cors = require('cors');
const multer = require('multer');
const mimeTypes = require('mime-types');





const storage = multer.diskStorage({
    destination: 'uploads/',
    filename: function(req,file,cb){
        cb("",Date.now() + "." + mimeTypes.extension(file.mimetype));
    }
})

const http = require('http');
const app = express();
const servidor = http.createServer(app);

app.use(express.json());
app.use(cors());


const db = mysql.createConnection({
    user        : 'root',
    host        : 'localhost',
    database    : 'campanita',
});

const PORT = process.env.PORT || 8080;

const upload = multer({
    storage: storage
})

const socketio = require('socket.io');
const io = socketio(servidor);

io.on('connection',socket =>{
    
    socket.on('conectado',()=>{
        console.log("Usuario conectado");
    })

    socket.on('mensaje',(mensaje)=>{
        io.emit("mensajes",{mensaje});
    })

    socket.on('disconnect',()=>{
        io.emit('mensajes',{servidor: "Servidor",mensaje: "Ha abandonado la sala"});

    })



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
                console.log(result);
                res.send(result);
            } else {
                console.log('Usuario o contraseña incorrectos');
                res.send({ message: "Usuario o contraseña incorrectos"});
            }
        }
    );
});

app.post("/files", upload.single('new_file'), (req,res) =>{

})

servidor.listen(PORT, console.log(`Server started on port ${PORT}`));
