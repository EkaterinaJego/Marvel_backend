const express = require("express");
const router = express.Router();
const User = require("../models/User");

// packages uid2 et crypto-js servent à encrypter le mot de passe
const SHA256 = require("crypto-js/sha256");
const encBase64 = require("crypto-js/enc-base64");
const uid2 = require("uid2");

// 1ère route pour créer un nouvel utilisateur :

router.post("/user/signup", async (req, res) => {
  const { email, password, username } = req.fields;

  try {
    const emailToFind = await User.findOne({ email: email });
    if (emailToFind) {
      res.status(409).json("There is already an account for this email");
    } else {
      if (email && password && username) {
        const token = uid2(64);
        const salt = uid2(16);
        const hash = SHA256(password + salt).toString(encBase64);

        const newUser = new User({
          email: email,
          username: username,
          token: token,
          salt: salt,
          hash: hash,
        });

        await newUser.save();
        res.json("New user : ", {
          username: username,
          email: email,
          token: token,
          id: newUser.id,
        });
      } else {
        res.json("Email / Username / Password is missing");
      }
    }
  } catch (error) {
    res.json({ error: `This is the error : ${error.message}` });
  }
});

// 2ème route pour permettre à l'utilisateur de se connecter

router.post("/user/login", async (req, res) => {
  const { email, password } = req.fields;

  try {
    const userToFind = await User.findOne({ email: email });

    if (userToFind) {
      if (
        SHA256(password + userToFind.salt).toString(encBase64) ===
        userToFind.hash
      ) {
        res.status(200).json({
          id: userToFind.id,
          token: userToFind.token,
          email: userToFind.email,
          username: userToFind.username,
        });
      } else {
        res.status(401).json({ error: "Unauthorized" });
      }
    } else {
      res.json(400).json({ error: "User not found" });
    }
  } catch (error) {
    res.json({ error: `This is the error : ${error.message}` });
  }
});

module.exports = router;
