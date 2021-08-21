const express = require("express");
const router = express.Router();
const axios = require("axios");
require("dotenv").config();

// 1ère route pour lister tous les personnages

router.get("/characters", async (req, res) => {
  try {
    const url = Object.keys(req.query).length
      ? `${process.env.API}/characters?apiKey=${process.env.API_SECRET_KEY}&name=${req.query.name}&skip=${req.query.skip}&limit=${req.query.limit}`
      : `${process.env.API}/characters?apiKey=${process.env.API_SECRET_KEY}`;
    const response = await axios.get(url);

    res.status(200).json(response.data);

    let filter = {};

    if (req.query.name) {
      filter.name = new RegExp(req.query.name, "i");
    }
  } catch (error) {
    res.status(400).json(`Erreur : ${error.message}`);
  }
});

module.exports = router;
