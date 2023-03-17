const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDb = require("./config/connectDB");
const mongoose = require("mongoose");
const routes = require("./routes/authRoutes");

const app = express();
dotenv.config();
app.use(express.json());

connectDb()
  .then(() => {
    console.log("db connected");
  })
  .catch(() => {
    console.log("error connecting to db");
  });

app.use(cors());

app.use("/api", routes);

const Port = process.env.Port || 8000;

mongoose.connection.once("open", () => {
  app.listen(Port, () => {
    console.log(`app running on ${Port}`);
  });
});
