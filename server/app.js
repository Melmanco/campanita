const express = require('express');
const mysql = require('mysql');
const cors = require('cors');

const app = express();

app.use(express.json());
app.use(cors());

const db = mysql.createConnection({
    user        : 'root',
    host        : 'localhost',
    database    : 'campanita',
});

const PORT = process.env.PORT || 8080;

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

app.listen(PORT, console.log(`Server started on port ${PORT}`));