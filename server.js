const express = require("express");
const cors = require("cors");
const { Pool } = require("pg");
require("dotenv").config();

const app = express();
app.use(express.json());
app.use(cors());

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false }
});

app.post("/signup", async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const result = await pool.query(
      "INSERT INTO login (name, email, password) VALUES ($1, $2, $3) RETURNING *",
      [name, email, password]
    );
    res.json(result.rows[0]);
  } catch (err) {
    console.error("Signup error:", err);
    res.status(500).json("Error");
  }
});

app.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const result = await pool.query(
      "SELECT * FROM login WHERE email = $1 AND password = $2",
      [email, password]
    );
    if (result.rows.length > 0) res.json("Success");
    else res.json("Failed");
  } catch (err) {
    console.error("Login error:", err);
    res.status(500).json("Error");
  }
});

app.listen(8081, () => console.log("Server running on port 8081"));
