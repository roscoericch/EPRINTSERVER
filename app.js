const express = require("express");
const cors = require("cors");
const cookiesParser = require("cookie-parser");
const dotenv = require("dotenv");
const connectDb = require("./config/connectDB");
const mongoose = require("mongoose");
const routes = require("./routes/authRoutes");

const app = express();
dotenv.config();

connectDb()
  .then(() => {
    console.log("db connected");
  })
  .catch(() => {
    console.log("error connecting to db");
  });

app.use(cors());

app.use("/api", routes);

mongoose.connection.once("open", () => {
  app.listen(process.env.Port || 8000, () => {
    console.log("app running");
  });
});
