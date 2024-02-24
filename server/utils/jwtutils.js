const jwt = require("jsonwebtoken");
// console.log(process.env.JWT_SECRET);

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "3d",
  });
};

const decodeToken = (token) => {
  return jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      return undefined;
    }
    return decoded;
  });
};

module.exports = { generateToken, decodeToken };
