import express from "express";
import bodyParser from "body-parser";
import pg from "pg";

// initialize express and port 8000
const app = express();
const port = 8000;

// use middleware
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Connect to the database
const db = new pg.Client({
  user: "postgres",
  host: "localhost",
  database: "StreamDB",
  password: "jaa678",
  port: 5432,
});
db.connect();

db.query("SELECT * FROM users", (err, res) => {
  if (err) {
    console.error(err);
    return;
  }
  console.log("Connected to the database");
});

// set app.post for user registration route
app.post("/register", async (req, res) => {
  // get email, password, and name from form
  const email = req.body.email;
  const password = req.body.password;
  const name = req.body.name;

  // validation check
  if (!email || !password || !name) {
    res.json({ error: "Please fill in all fields" });
    return;
  }
  // use try and catch to check if the user exists
  try {
    // check if email already exists in the database
    const checkResult = await db.query("SELECT * FROM users WHERE email = $1", [
      email,
    ]);
    // if email exists, send a message to the user
    if (checkResult.rows.length > 0) {
      res.json({ error: "User already exists. Try logging in!" });
      return;
    } else {
      // if email does not exist, insert user into the database
      const result = await db.query(
        "INSERT INTO users (name, email, password) VALUES ($1, $2, $3)",
        [name, email, password]
      );
      res.json({ message: "Registration successful" });
    }
    // catch any errors that happen
  } catch (error) {
    console.error("Failed to make request:", error.message);
  }
});

// set app.post for user login route
app.post("/login", async (req, res) => {
  // get email and password from form
  const email = req.body.email;
  const password = req.body.password;

  // validation check
  if (!email || !password) {
    res.json({ error: "Please fill in all fields" });
    return;
  }

  // use try and catch to check if email exists in the database
  try {
    // get the email from the user
    const result = await db.query("SELECT * FROM users WHERE email = $1", [
      email,
    ]);
    // if email exists, check if the password is correct
    if (result.rows.length > 0) {
      const user = result.rows[0];
      const storedPassword = user.password;

      // if the password matches the stored password, send a message to the user
      if (password === storedPassword) {
        // login successful
        res.json({ message: "Login successful" });
      } else {
        // login failed
        res.json({ error: "Incorrect password" });
      }
      // else email does not exists
    } else {
      res.json({ error: "User does not exist" });
    }
    // catch any errors that happen
  } catch (error) {
    console.error("Failed to make request:", error.message);
  }
});

app.get("/api", (req, res) => {
  res.json({ message: "Hello from server!" });
});

// listen to port
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
