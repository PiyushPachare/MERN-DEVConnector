const jwt = require("jsonwebtoken");
const config = require("config");

module.exports = function (req, res, next) {
  // next = callback
  //Get token from header
  const token = req.header("x-auth-token"); //Getting Token

  //Check if no token

  if (!token) {
    return res.status(401).json({ msg: "No token, authorization denied" }); //Check for token
  }

  //Verify token
  try {
    const decoded = jwt.verify(token, config.get("jwtToken")); //decode token

    req.user = decoded.user;
    next();
  } catch (err) {
    res.status(401).json({ msg: "Token not valid" });
  }
};
