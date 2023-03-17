const User = require("../../model/userModel");
const bcrypt = require("bcrypt");
const JWT = require("jsonwebtoken");

const signupHandler = async (req, res) => {
  try {
    const { firstName, lastName, email, password, phoneNumber } = req.body;
    const checkEmail = await User.findOne({ email });
    const checkPhone = await User.findOne({ phoneNumber });
    if (checkPhone) {
      return res.status(401).json({ message: "Phone is already registered" });
    }
    if (checkEmail) {
      return res.status(401).json({ message: "Email Already in use" });
    }
    const hashPassword = await bcrypt.hash(password, 10);
    const user = await User.create({
      firstName,
      lastName,
      password: hashPassword,
      phoneNumber,
      email,
    });
    const token = JWT.sign({ userId: user.userId }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });
    return res.status(200).json({ token, user, message: "user created" });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ message: "internal server error ocurred ehile creating user" });
  }
};

module.exports = signupHandler;
