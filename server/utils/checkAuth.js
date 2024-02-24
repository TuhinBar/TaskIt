const { decodeToken } = require("./jwtutils");

const checkAuth = (req, res, next) => {
  const token = req.cookies.authToken;
  if (!token) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  if (token) {
    const decodedToken = decodeToken(token);
    if (!decodedToken) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    req.user = decodedToken;
  }
  next();
};

module.exports = checkAuth;
