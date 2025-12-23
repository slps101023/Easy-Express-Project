//To see how the final website should work, run "node solution.js".
//Make sure you have installed all the dependencies with "npm i".
//The password is ILoveProgramming

import express from "express";
import { dirname } from "path";
import { fileURLToPath } from "url";
import bodyParser from "body-parser";

const __dirname = dirname(fileURLToPath(import.meta.url));
const app = express();
const port = 3000;
var isAuthenticated = false;

// Middleware to parse URL-encoded bodies
app.use(bodyParser.urlencoded({ extended: true }));

// Use middleware to check password
app.use(checkPassword);

// Serve static files from the "public" directory
app.get("/", (req, res) => {
  console.log(__dirname + "/public/index.html");
  res.sendFile(__dirname + "/public/index.html");
});

// Handle form submission
app.post("/check", (req, res) => {
  console.log(req.body);
  if (isAuthenticated) {
    res.sendFile(__dirname + "/public/secret.html");
  } else {
    res.sendFile(__dirname + "/public/index.html");
  }
});

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});

// Middleware to check password
function checkPassword(req, res, next) {
  const password = req.body.password;
  // Password is correct, proceed to the next middleware/route handler
  if (password === "ILoveProgramming") {
    isAuthenticated = true;
  }
  next();
}

