const express = require("express");
const app = express();
const routes=require("./routes/route")
const path = require("path");

app.use(express.json());
app.use("/user", routes);
app.use(express.static(path.join(__dirname, "public")));

// Set the 'views' directory for HTML files
app.set("views", path.join(__dirname, "views"));

app.get("/dashboard", (req, res) => {
  res.sendFile(path.join(__dirname, "views", "index.html"));
});

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "views", "login.html"));
  });

  app.get("/register", (req, res) => {
    res.sendFile(path.join(__dirname, "views", "register.html"));
  });


  app.get("/mylist", (req, res) => {
    res.sendFile(path.join(__dirname, "views", "city.html"));
  });
  
  
  app.get("/topcities", (req, res) => {
    res.sendFile(path.join(__dirname, "views", "topcities.html"));
  });


module.exports = app;
