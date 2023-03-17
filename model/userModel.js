const mongoose = require("mongoose");
const { v4: uuid } = require("uuid");

const { Schema } = mongoose;

const User = new Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
    },
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    phoneNumber: {
      type: Number,
      required: true,
    },
    userId: {
      type: String,
      default: uuid,
    },
  },
  { timestamps: true }
);

// User.statics.comparePassword = async (userPassword, inputPassword) => {
//   const decryptPassword = CryptoJS.AES.decrypt(
//     userPassword,
//     process.env.PASSSEC
//   );
//   const plainPassword = decryptPassword.toString(CryptoJS.enc.Utf8);

//   return plainPassword === inputPassword;
// };

module.exports = mongoose.model("User", User);
