const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");
const bodyParser = require("body-parser");
require("dotenv").config();

const app = express();

app.use(cors());
app.use(bodyParser.json());

const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME
});

db.connect((err) => {
  if (err) {
    console.log("Database connection failed");
  } else {
    console.log("Connected to MySQL");
  }
});

app.post("/appointment", (req, res) => {

  const { name, email, date } = req.body;

  const sql = `
    INSERT INTO appointments(name, email, appointment_date)
    VALUES (?, ?, ?)
  `;

  db.query(sql, [name, email, date], (err) => {

    if (err) {
      return res.status(500).send(err);
    }

    res.send("Appointment Booked Successfully");
  });
});

app.listen(3000, () => {
  console.log("Server running on port 3000");
});