const express = require('express');
const app = express();
const cors = require('cors');
const mysql = require('mysql');
const PORT = process.env.port || 4000;

let corsOptions = {
    origin: true,
    credential: true,
};
app.use(cors(corsOptions));
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.header("Access-Control-Allow-Headers", "x-access-token, Origin, X-Requested-With, Content-Type, Accept");
    next();
});
const db = mysql.createPool({
    host: "localhost",
    user: "root",
    password: "4661",
    database: "bulletinboard",
});

app.get('/', (req, res) => {
    const sqlQuery = "SELECT email FROM USER";
    db.query(sqlQuery, (err, data) => {
        if (err) {
            res.send(err);
        } else {
            res.send(data);
        }

    });
});
app.listen(PORT, () => {
    console.log(`Server run : http://localhost:${PORT}/`)
})


