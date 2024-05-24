var express = require("express");
var router = express.Router();
const dotenv = require("dotenv");
dotenv.config();
const { google } = require("googleapis");

router.post("/", async function (req, res) {
  try {
    res.header("Access-Control-Allow-Origin", "http://localhost:5173"); // Block CORS
    res.header("Referrer-Policy", "no-referrer-when-downgrade");

    const oAuth2Client = new google.auth.OAuth2(
      process.env.CLIENT_ID,
      process.env.CLIENT_SECRET,
      "http://localhost:5173"
    );

    const scopes = [
      "https://www.googleapis.com/auth/calendar",
      "https://www.googleapis.com/auth/userinfo.profile",
    ];

    const authorizeUrl = oAuth2Client.generateAuthUrl({
      access_type: "offline",
      scope: scopes,
      prompt: "consent",
    });

    res.status(200).json({
      url: authorizeUrl,
    });
  } catch (err) {
    res.status(500).json({ error: "A requests.js error happened" });
  }
});

module.exports = router;
