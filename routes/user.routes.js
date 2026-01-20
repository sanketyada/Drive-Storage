const express = require("express");
const router = express.Router();
const User = require("../model/user.model");

router.get("/", (req, res) => {
  res.json({ message: "Welcome in User Routes" });
});

//register Page
router.get("/register", (req, res) => {
  res.render("register");
});

//regsiter Logic
router.post("/register", async (req, res) => {
  console.log(req.body);
  const { username, email, password } = req.body;
  const newUser = await User.create({
    username,
    email,
    password,
  });
  res.send(newUser);
});

module.exports = router;
