const jwt = require("jsonwebtoken");
const {secret} = require("../config/config")


exports.auth = (req, res, next) => {
  let token = req.header("x-api-key");
  if (!token) {
    return res.status(401).json({ msg: "You must send token bro" })
  }
  try {
    let decodToken = jwt.verify(token, `${secret.jwtSecret}`);
    req.userTokenData = decodToken;
    next();
  }
  catch (err) {
    console.log(err)
    res.status(401).json({ msg: "Token invalid or expired" })
  }
}