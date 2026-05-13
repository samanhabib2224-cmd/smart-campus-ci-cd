const express = require("express");
const { Pool } = require("pg");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

// PostgreSQL Connection
const pool = new Pool({
  user: "postgres",
  host: "database",
  database: "smartcampus",
  password: "postgres",
  port: 5432,
});

// Create Tables Automatically
async function createTables() {
  await pool.query(`
    CREATE TABLE IF NOT EXISTS students (
      id SERIAL PRIMARY KEY,
      name VARCHAR(100),
      email VARCHAR(100)
    )
  `);

  await pool.query(`
    CREATE TABLE IF NOT EXISTS contacts (
      id SERIAL PRIMARY KEY,
      name VARCHAR(100),
      email VARCHAR(100),
      message TEXT
    )
  `);
}

createTables();

// ROUTES

// Courses (Static)
app.get("/courses", (req, res) => {
  res.json([
    { name: "Web Development" },
    { name: "Database Systems" },
    { name: "Cloud Computing" }
  ]);
});

// Register Student
app.post("/register", async (req, res) => {
  const { name, email } = req.body;

  await pool.query(
    "INSERT INTO students (name, email) VALUES ($1, $2)",
    [name, email]
  );

  res.send("Student Registered Successfully!");
});

// Get Students
app.get("/students", async (req, res) => {
  const result = await pool.query("SELECT * FROM students");
  res.json(result.rows);
});

// Contact Form
app.post("/api/contact", async (req, res) => {
  const { name, email, message } = req.body;

  await pool.query(
    "INSERT INTO contacts (name, email, message) VALUES ($1, $2, $3)",
    [name, email, message]
  );

  res.json({ message: "Message saved successfully!" });
});

// Start Server
app.listen(5000, () => {
  console.log("Backend running on port 5000");
});