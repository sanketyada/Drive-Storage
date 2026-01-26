const express = require("express");
require("dotenv").config();
const User = require("./model/user.model");

const ConnectDB = require("./config/db");
ConnectDB();
const userRought = require("./routes/user.route");
const app = express();
const PORT = process.env.PORT || 5000;

app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(express.json());
app.use(express.urlencoded({ extended: "true" }));
var cookieParser = require("cookie-parser");
app.use(cookieParser());


const indexRought = require("./routes/index.route")
app.use("/",indexRought);

//user Routes
app.use("/user", userRought);

app.listen(PORT, (req, res) => {
  console.log(`http://localhost:${PORT}/`);
});
