const express = require("express");
const app = express();
require("dotenv").config();
const cors = require("cors");
const axios = require("axios");

const comicsRoutes = require("./routes/comics");
const charactersRoutes = require("./routes/characters");

app.use(cors());

app.use(comicsRoutes);
app.use(charactersRoutes);

app.get("/", (req, res) => {
  res.json({ message: "Welcome to the Marvel backend page" });
});

app.all("*", (req, res) => {
  res.json({ message: "Page not found" });
});

app.listen(process.env.PORT || 5000, () => {
  console.log("Server has started");
});
