const JWT = require("jsonwebtoken");
const authMiddleware = (req, res) => {
  const accessToken = req.headers.token;
  if (!accessToken) {
    return res.status(403).Json({ message: "unauthorized" });
  }

  JWT.verify(accessToken, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(403).Json({ message: "forbidden" });
    }
    req.user = decoded;
    next();
  });
};

module.exports = authMiddleware;
