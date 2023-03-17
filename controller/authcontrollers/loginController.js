const User = require("../../model/userModel");
const bcrypt = require("bcrypt");
const JWT = require("jsonwebtoken");

const loginHandler = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(403).json({ message: "invalid request data" });
    }
    const user = await User.findOne({ email });
    const authenticated = await bcrypt.compare(password, user.password);

    if (authenticated) {
      const token = JWT.sign({ userId: user.userId }, process.env.JWT_Secret, {
        expiresIn: "1h",
      });
      return res.status(200).json({ token, user });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "internal server error" });
  }
};

module.exports = loginHandler;
