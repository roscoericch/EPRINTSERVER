const User = require("../../model/userModel");
const bcrypt = require("bcrypt");
const JWT = require("jsonwebtoken");

const loginHandler = async (req, res) => {
  try {
    const body = req.body;
    if (!body.email || !body.password) {
      return res.status(403).json({ message: "invalid request data" });
    }
    const user = await User.findOne({ email: body.email });
    const authenticated = await bcrypt.compare(body.password, user.password);

    if (authenticated) {
      const token = JWT.sign(user.userId, process.env.JWT_Secret);
      return res.status(200).json({ token, user });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "internal server error" });
  }
};

module.exports = loginHandler;
