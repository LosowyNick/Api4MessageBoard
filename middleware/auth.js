const jwt = require("jsonwebtoken");
const jwtSecret = process.env.JWT_SECRET;

const userAuth = function (req, res, next){
  const token = req.cookies.jwt;
  if (token) {
    jwt.verify(token, jwtSecret, (err, decodedToken) => {
      if (err) {
        return res.status(401).json({ message: "Not authorized" });
      } else {
        if (decodedToken.id !== "6469d0698a02e9dee1fc23d2") { //tylko iwona bedzie moga robic request
          return res.status(401).json({ message: "Not authorized" });
        } else {
          next();
        }
      }
    });
    } else {
      return res
        .status(401)
        .json({ message: "Not authorized, token not available" });
    }
  }

module.exports = { userAuth };