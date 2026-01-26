const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const UserModel = require("../model/user.model");
const bcrypt = require("bcrypt");
const { body, validationResult } = require("express-validator");
router.get("/", (req, res) => {
  res.send("Welcome To User Rought");
});
router.get("/register", (req, res) => {
  res.render("register");
});
router.post(
  "/register",
  body("username").trim().isLength({ min: 3 }),
  body("email").trim().isLength({ min: 13 }),
  body("password").trim().isLength({ min: 8 }),
  async (req, res) => {
    const error = validationResult(req);
    if (!error.isEmpty()) {
      return res.status(400).json({
        error: error,
        message: "Invalid Data",
      });
    }
    const { username, email, password } = req.body;
    let hashedPassword = await bcrypt.hash(password, 10);

    let user = await UserModel.findOne({ username: username });
    let userEmail = await UserModel.findOne({ email: email });
    if (user || userEmail) {
      return res.status(401).json({
        message: "User Already Exist",
      });
    }

    const newUser = await UserModel.create({
      username,
      email,
      password: hashedPassword,
    });
    res.json({
      user: newUser,
      message: "User Created",
    });
  },
);

//login routes
router.get("/login", (req, res) => {
  res.render("Login");
});
router.post(
  "/login",
  body("username").trim().isLength({ min: 3 }),
  body("password").trim().isLength({ min: 8 }),
  async (req, res) => {
    const { username, password } = req.body;

    const user = await UserModel.findOne({ username });
    if (!user) {
      // return res.status(401).json({
      //   message: "Invalid Username or Password",
      // });

      res.status(401).render("error", {
        status: 401,
        message: "You must be logged in to access this page",
      });
    }
    const isMatch = await bcrypt.compare(password, user.password);

    // console.log(isMatch);

    //Matching password with Db password
    if (!isMatch) {
      // return res.status(400).json({
      //   message: "User or Password is Invalid",
      // });

      res.status(401).render("error", {
        status: 401,
        message: "You must be logged in to access this page",
      });
    }

    //if Password get matched "Generate Token"
    const token = jwt.sign(
      {
        userId: user._id,
        username: user.username,
        email: user.email,
      },
      process.env.JWT_SECRET,
    );

    res.cookie("Token", token);

    return res.redirect("/");
  },
);

router.get("/logout", (req, res) => {
  res.clearCookie("Token", {
    httpOnly: true,
    sameSite: "strict",
  });

  res.redirect("/user/login");
});

module.exports = router;
