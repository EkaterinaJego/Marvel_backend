const express = require("express");
const router = express.Router();
const axios = require("axios");

// FICHE TECHNIQUE
// Sur la page « comics », vous devrez faire apparaître la liste des comics MARVEL, par ordre alphabétique, sous forme de fiche (photo, titre, description).

// 1ère route pour récupérer toute la bdd des BDs

router.get("/comics", async (req, res) => {
  try {
    const response = await axios
      .get(`${process.env.API}/comics?apiKey=${process.env.API_SECRET_KEY}`)
      .then((response) => {
        res.json("Hi");
        res.json(response.data);
        console.log(response.data);
      });
  } catch (error) {
    res.status(400).json(error.message);
  }
});

//  2ème route pour récupérer les BDD liés au personnage

router.get("/comics/:characterId", async (req, res) => {
  try {
    const characterId = req.params.id;
    const response = axios.await(
      `${process.env.API}/comics/${characterId}?apiKey=${process.env.API_SECRET_KEY}`
    );
    const object = {};
    res.json(response.data);
  } catch (error) {
    res.status(400).json(error.message);
  }
});

module.exports = router;
