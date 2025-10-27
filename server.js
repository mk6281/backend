// Import required modules
const express = require("express");
const { Client } = require("pg");
const cors = require("cors");
require("dotenv").config();

const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// PostgreSQL client setup
const db = new Client({
  connectionString: process.env.DATABASE_URL
});

// Connect to Neon database
db.connect()
  .then(() => console.log("✅ Connected to Neon database"))
  .catch(err => console.error("❌ Database connection error:", err.stack));

// Signup endpoint
app.post('/signup', async (req, res) => {
  const sql = "INSERT INTO login (name, email, password) VALUES ($1, $2, $3) RETURNING *";
  const values = [req.body.name, req.body.email, req.body.password];

  try {
    const result = await db.query(sql, values);
    res.json(result.rows[0]); // return inserted row
  } catch (err) {
    console.error(err);
    res.status(500).json("Error");
  }
});

// Login endpoint
app.post('/login', async (req, res) => {
  const sql = "SELECT * FROM login WHERE email = $1 AND password = $2";
  const values = [req.body.email, req.body.password];

  try {
    const result = await db.query(sql, values);
    if(result.rows.length > 0){
      res.json("Success");
    } else {
      res.json("Failed");
    }
  } catch(err) {
    console.error(err);
    res.status(500).json("Error");
  }
});

// Start server
const PORT = process.env.PORT || 8081;
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});

// // const express = require("express");

// // const mysql = require('mysql');

// // const cors = require('cors');

// // const app = express();

// // app.use(cors());

// // const db = mysql.createConnection({

// // host: "localhost",

// // user:

// // "root",

// // password: "",

// // database: "signup"  
// // });

// // app.post('/signup', (req, res) => {

// // const sql = "INSERT INTO login (`name`, `email`, `password`) VALUES (?)";

// // const values = [



// // req.body.name,

// // req.body.email,

// // req.body.password
// // ]

// // db.query(sql, [values], (err, data) => {

// // if(err) {

// // return res.json("Error");

// // }

// // return res.json(data);

// // })

// // })

// // app.listen(8081, ()=> {

// // console.log("listening");



// // })

// const express = require("express");
// const mysql = require('mysql');
// const cors = require('cors');

// const app = express();

// // Add these middleware
// app.use(express.json());
// app.use(cors());

// const db = mysql.createConnection({
//     host: "localhost",
//     user: "root",
//     password: "",
//     database: "signup"
// });

// // Add error handling for database connection
// // db.connect((err) => {
// //     if (err) {
// //         console.error('Error connecting to database:', err);
// //         return;
// //     }
// //     console.log('Connected to database');
// // });

// app.post('/signup', (req, res) => {
//     const sql = "INSERT INTO login (`name`, `email`, `password`) VALUES (?)";
//     const values = [
//         req.body.name,
//         req.body.email,
//         req.body.password
//     ];

//     db.query(sql, [values], (err, data) => {
//         if(err) {
//             // console.error('Query error:', err);
//             // return res.status(500).json("Error");
//             return res.json("Error");
//         }
//         return res.json(data);
//     });
// });

// app.post('/login', (req, res) => {
//     const sql = "SELECT * FROM login WHERE `email` = ? AND `password` = ?";
    

//     db.query(sql, [req.body.email,req.body.password], (err, data) => {
//         if(err) {
//             // console.error('Query error:', err);
//             // return res.status(500).json("Error");
//             return res.json("Error");
//         }
//         if(data.length > 0){return res.json("Success");}
//         else{
//             return res.json("Failed");
//         }
//     });
// });

// app.listen(8081, ()=> {
//     console.log("Server listening on port 8081");
// });
