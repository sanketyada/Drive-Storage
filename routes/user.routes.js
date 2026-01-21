const express = require("express");
const router = express.Router();
const User = require("../model/user.model");
const { body, validationResult } = require("express-validator");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

router.get("/", (req, res) => {
  res.json({ message: "Welcome in User Routes" });
});

//register Page
router.get("/register", (req, res) => {
  res.render("register");
});

//regsiter Logic
router.post(
  "/register",
  body("username").trim().isLength({ min: 3 }),
  body("email").trim().isEmail().isLength({ min: 13 }),
  body("password").trim().isLength({ min: 5 }),
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        error: errors.array(),
        message: "Invalid data",
      });
    }

    const { username, email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);

    const userExist = await User.findOne({ username: username });
    const userEmail = await User.findOne({ email: email });
    if (userExist || userEmail) {
      res.status(400).json({
        message: "User Exist",
      });
    }
    // console.log(hashedPassword)
    const newUser = await User.create({
      username,
      email,
      password: hashedPassword,
    });
    res.status(200).json({
      message: "User created",
    });
  },
);

//login page
router.get("/login", (req, res) => {
  res.render("login");
});

router.post("/login", async (req, res) => {
  const { username, password } = req.body;

  const user = await User.findOne({ username });
  if (!user) {
    return res.status(401).json({
      message: "User or Password is Invalid",
    });
  }

  const isMatch = await bcrypt.compare(password, user.password);
  console.log(isMatch)

  if (!isMatch) {
    return res.status(401).json({
      message: "User or Password is Invalid",
    });
  }

  res.status(200).json({
    message: "Login successful",
  });
});



module.exports = router;
