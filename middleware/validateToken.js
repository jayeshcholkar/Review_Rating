const jwt = require("jsonwebtoken");

const validateToken = async (req, res, next) => {
  let authHeader = req.headers.Authorization || req.headers.authorization;
  if (authHeader && authHeader.startsWith("Bearer")) {
    let token = authHeader.split(" ")[1];
    jwt.verify(token, process.env.ACCESS_TOKEN, (err, decoded) => {
      if (err) {
        res.status(401).json({
          success: false,
          message: "User is not authorized",
        });
      } else {
        req.user = decoded.user;
        console.log(decoded.user); // Login user details , Decode the value we pass for jwt payload(encode)
        next();
      }
    });
  } else {
    res.status(500).json({
      success: false,
      message: "token is not found",
    });
  }
};

module.exports = validateToken;
