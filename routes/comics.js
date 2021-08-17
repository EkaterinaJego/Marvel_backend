const express = require("express");
const router = express.Router();
const axios = require("axios");
require("dotenv").config();

// FICHE TECHNIQUE
// Sur la page « comics », vous devrez faire apparaître la liste des comics MARVEL, par ordre alphabétique, sous forme de fiche (photo, titre, description).

// 1ère route pour récupérer toute la bdd des BDs  &skip=${skip}&limit=${limit}

router.get("/comics", async (req, res) => {
  try {
    const url = Object.keys(req.query).length
      ? `${process.env.API}/comics?apiKey=${process.env.API_SECRET_KEY}&title=${req.query.title}&skip=${req.query.skip}&limit=${req.query.limit}`
      : `${process.env.API}/comics?apiKey=${process.env.API_SECRET_KEY}`;
    const response = await axios.get(url);
    res.status(200).json(response.data);

    let filter = {};

    if (req.query.title) {
      filter.title = new RegExp(req.query.title, "i");
    }
  } catch (error) {
    res.status(400).json(`Erreur : ${error.message}`);
  }
});

//  2ème route pour récupérer les BD liés au personnage

router.get("/comics/:id", async (req, res) => {
  try {
    const characterId = req.params.id;
    const response = await axios.get(
      `${process.env.API}/comics/${characterId}?apiKey=${process.env.API_SECRET_KEY}`
    );
    res.json(response.data);
    console.log(response.data);
  } catch (error) {
    res.status(400).json(`Erreur : ${error.message}`);
  }
});

module.exports = router;
