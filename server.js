// const express = require("express");

// const mysql = require('mysql');

// const cors = require('cors');

// const app = express();

// app.use(cors());

// const db = mysql.createConnection({

// host: "localhost",

// user:

// "root",

// password: "",

// database: "signup"  
// });

// app.post('/signup', (req, res) => {

// const sql = "INSERT INTO login (`name`, `email`, `password`) VALUES (?)";

// const values = [



// req.body.name,

// req.body.email,

// req.body.password
// ]

// db.query(sql, [values], (err, data) => {

// if(err) {

// return res.json("Error");

// }

// return res.json(data);

// })

// })

// app.listen(8081, ()=> {

// console.log("listening");



// })

const express = require("express");
const mysql = require('mysql');
const cors = require('cors');

const app = express();

// Add these middleware
app.use(express.json());
app.use(cors());

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "signup"
});

// Add error handling for database connection
// db.connect((err) => {
//     if (err) {
//         console.error('Error connecting to database:', err);
//         return;
//     }
//     console.log('Connected to database');
// });

app.post('/signup', (req, res) => {
    const sql = "INSERT INTO login (`name`, `email`, `password`) VALUES (?)";
    const values = [
        req.body.name,
        req.body.email,
        req.body.password
    ];

    db.query(sql, [values], (err, data) => {
        if(err) {
            // console.error('Query error:', err);
            // return res.status(500).json("Error");
            return res.json("Error");
        }
        return res.json(data);
    });
});

app.post('/login', (req, res) => {
    const sql = "SELECT * FROM login WHERE `email` = ? AND `password` = ?";
    

    db.query(sql, [req.body.email,req.body.password], (err, data) => {
        if(err) {
            // console.error('Query error:', err);
            // return res.status(500).json("Error");
            return res.json("Error");
        }
        if(data.length > 0){return res.json("Success");}
        else{
            return res.json("Failed");
        }
    });
});

app.listen(8081, ()=> {
    console.log("Server listening on port 8081");
});