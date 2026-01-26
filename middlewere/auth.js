const jwt = require("jsonwebtoken");

async function authentication(req, res, next) {
  const token = req.cookies.Token;

  if (!token) {
    // return res.status(400).json({
    //   message: "Unauthorised Access",
    // });
    return res.redirect("/user/login");
  }

  try {
    //ager token mil jata hai
    //token ka use karke sara data padh sakte hai
    //jo tumne login ke samay cookies me bheja tha
    const decode = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decode;
    // console.log(decode)
    return next();
  } catch (error) {
    // res.status(400).json({
    //   message: "Unauthorised Access",
    // });
    return res.redirect("/user/login");
  }
}

module.exports = authentication;
