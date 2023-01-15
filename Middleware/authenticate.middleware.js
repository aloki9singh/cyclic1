const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const authenticate = (req, res, next) => {
  const token = req.headers.authorization;
  if (token) {
    //token,secrettoken as masai//
    const decoded = jwt.verify(token, "masai");
    if (decoded) {
      const userID =decoded.userID
      console.log(decoded)
      req.body.userID=userID
      next();
    } else {
      res.send("Please Login First");
    }
  } else {
    res.send("Please Login First");
  }
}

module.exports={
    authenticate,
}
