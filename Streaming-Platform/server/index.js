import express from "express";
import bodyParser from "body-parser";
import pg from "pg";
import axios from "axios";

// initialize express and port 8000
const app = express();
const port = 8000;

// use middleware
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));


// use app.get to get the data from the streaming API
app.get("/", async (req, res) => {
    
// connect to database

app.get("/api", (req, res) => {
  res.json({ message: "Hello from server!" });
});

// listen to port
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
