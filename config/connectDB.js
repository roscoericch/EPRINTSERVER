const mongoose = require("mongoose");

connectDb = () =>
  mongoose.connect(
    process.env.Mongo_url
  );

module.exports = connectDb;
