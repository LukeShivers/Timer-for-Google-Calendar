var express = require('express');
var router = express.Router();
const dotenv = require('dotenv')
dotenv.config()
const {OAuth2Client} = require('google-auth-library');


router.post('/', async function(req, res, next) {
    try {
        res.header('Access-Control-Allow-Origin', 'http://localhost:5173')      // Block CORS
        res.header('Referrer-Policy', 'no-referrer-when-downgrade')

        // const oAuth2Client = new google.auth.OAuth2(
        const oAuth2Client = new OAuth2Client(
            process.env.CLIENT_ID,
            process.env.CLIENT_SECRET,
            'http://localhost:3000/oauth',
        )

        const scopes = [
            "https://www.googleapis.com/auth/calendar",
            "https://www.googleapis.com/auth/userinfo.profile" 
        ]

        const authorizeUrl = oAuth2Client.generateAuthUrl({
            access_type: "offline",
            scope: scopes,
            prompt: 'consent'
        });

        res.json({
            url: authorizeUrl,
        });
    } catch (error) {
        console.log('An error happened: ', error);
    }
})

module.exports = router;