const { decodeToken } = require("./jwtutils");

const checkAuth = (req, res, next) => {
  const token = req.cookies.authToken;
  // console.log(token);
  if (!token) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  if (token) {
    const decodedToken = decodeToken(token);
    if (!decodedToken) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    // console.log(decodedToken);
    req.user = decodedToken.id;
  }
  next();
};

module.exports = checkAuth;
