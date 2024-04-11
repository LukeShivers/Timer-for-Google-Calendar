var express = require('express');
var router = express.Router();
const dotenv = require('dotenv')
dotenv.config()
const {OAuth2Client} = require('google-auth-library');

var bodyParser = require('body-parser');
router.use(bodyParser.json());


const oAuth2Client = new OAuth2Client(                          // Add oAuth2Client
    process.env.CLIENT_ID,
    process.env.CLIENT_SECRET,
    'http://localhost:5173',
);


router.post('/', async function (req, res, next) {
    try {
        res.header('Access-Control-Allow-Origin', 'http://localhost:5173')      // Block CORS
        res.header('Referrer-Policy', 'no-referrer-when-downgrade')
        const url = req.body;
        console.log("URL:", url);
        // const requestCode = req.query.code;                             // Get the code
        // const tokens = await oAuth2Client.getToken(requestCode);        // Get access & refresh tokens out of the request code 
        // await oAuth2Client.setCredentials(tokens);                      // Set credentials for oAuth2Client
        // console.log(oAuth2Client.credentials);
    
        res.json({
            authorized: true,
        });
    } catch {
        console.error('An oauth.js error happened: ', error);
    }
});


module.exports = router;