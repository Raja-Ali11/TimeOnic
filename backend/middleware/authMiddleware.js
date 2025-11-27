const jwt = require("jsonwebtoken");

module.exports = function (req, res, next) {
  try {
    const token =
      req.header("Authorization")?.replace("Bearer ", "") ||
      req.header("x-auth-token");

    if (!token) {
      return res.status(401).json({ message: "No token, authorization denied" });
    }

    const decoded = jwt.verify(token, process.env.SECRET_KEY);
    req.user = decoded;

    next();
  } catch (err) {
    return res.status(401).json({ message: "Token is not valid" });
  }
};
