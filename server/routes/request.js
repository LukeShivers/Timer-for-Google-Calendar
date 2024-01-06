let express = require('express')
let router = express.Router();
const dotenv = require('dotenv')
dotenv.config()
const {OAuth2Client} = require('google-auth-library');

// GET users listing.
router.post('/', async function(req, res, next) {
    res.header('Access-Control-Allow-Origin', 'http://localhost:5173')      // Block CORS
    res.header('Referrer-Policy', 'no-referrer-when-downgrade')     // Have to have this header when using http (not https) with google auth

    const redirectUrl = 'http://127.0.0.1:3000/oauth';      // This has to match redirect URI in Google Dev Console. Otherwise you'll get an error.

    const oAuth2Client = new OAuth2Client(
        process.env.CLIENT_ID,
        process.env.CLIENT_SECRET,
        redirectUrl
    )

    const authorizeUrl = oauth2Client.generateAuthUrl({
        access_type: "offline",     // Forces a refresh token to always be sent.
        scope: 'https://www.googleapis.com/auth/userinfo.profile openid',
        prompt: 'consent'       // Consent screen stays open until they're approved even if they're signed in.
    });

    res.json({url:authorizeUrl})
})

module.exports = router;