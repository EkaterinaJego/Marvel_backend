const express = require("express");
const router = express.Router();
const axios = require("axios");

// FICHE TECHNIQUE
// Sur la page principale « personnages », vous devrez faire apparaître la liste des personnages MARVEL, par ordre alphabétique (100 par page), sous forme de fiche (photo, nom, description). En cliquant sur chaque fiche, il devra être possible d’accéder à une page regroupant les comics liés au personnage.

// 1ère route pour lister tous les personnages

router.get("/characters", async (req, res) => {
  try {
    const response = await axios
      .get(`${process.env.API}/characters?apiKey=${process.env.API_SECRET_KEY}`)
      .then((response) => {
        res.json("Hi");
        res.json(response.data);
        console.log(response.data);
      });
    res.status(200).json(response.data);
    console.log(response.data);
  } catch (error) {
    res.status(400).json(error.message);
  }
});

module.exports = router;
