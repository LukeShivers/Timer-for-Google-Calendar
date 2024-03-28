var express = require('express');
var router = express.Router();
const dotenv = require('dotenv')
dotenv.config()
const {OAuth2Client} = require('google-auth-library');


const oAuth2Client = new OAuth2Client(                          // Add oAuth2Client
    process.env.CLIENT_ID,
    process.env.CLIENT_SECRET,
    'http://localhost:3000/oauth',
);


let sharedData = null;


async function checkAuth() {
    return new Promise((resolve, reject) => {
        if (sharedData) {
            resolve();
        } else {
            setTimeout(() => {
                console.log("Checking")
                resolve(checkAuth());
            }, 500);
        }
    });
}


router.get('/', async function (req, res, next) {
    const requestCode = req.query.code;                             // Get the code
    const tokens = await oAuth2Client.getToken(requestCode);        // Get access & refresh tokens out of the request code 
    await oAuth2Client.setCredentials(tokens);                      // Set credentials for oAuth2Client
    sharedData = true;
    res.redirect("http://localhost:5173/")
});


router.get('/authorized', async function (req, res, next) {
    res.header('Access-Control-Allow-Origin', 'http://localhost:5173')
    res.header('Referrer-Policy', 'no-referrer-when-downgrade')

    await checkAuth();

    res.json({
        authorized: true,
    });
});


module.exports = router;