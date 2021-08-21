const express = require("express");
const formidable = require("express-formidable");
require("dotenv").config();
const cors = require("cors");
const axios = require("axios");
const mongoose = require("mongoose");

const app = express();

mongoose.connect("mongodb://localhost:27017/usermarvel", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
});
app.use(formidable());
app.use(cors());

const comicsRoutes = require("./routes/comics");
const charactersRoutes = require("./routes/characters");
const userRoutes = require("./routes/user");

app.use(comicsRoutes);
app.use(charactersRoutes);
app.use(userRoutes);

app.get("/", (req, res) => {
  res.json({ message: "Welcome to the Marvel backend page" });
});

app.all("*", (req, res) => {
  res.json({ message: "Page not found" });
});

app.listen(process.env.PORT || 3001, () => {
  console.log("Server has started");
});
