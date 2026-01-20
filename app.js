const express = require("express");
require("dotenv").config();
const User = require("./model/user.model");
const ConnectDB = require("./config/db");
const userRoute = require("./routes/user.routes");
ConnectDB();
const app = express();
const PORT = process.env.PORT || 5000;

app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(express.json());
app.use(express.urlencoded({ extended: "true" }));

app.use("/user", userRoute);

app.get("/", (req, res) => {
  res.render("index");
});

app.listen(PORT, (req, res) => {
  console.log(`http://localhost:${PORT}/`);
});
