var express = require('express');
var router = express.Router();
const dotenv = require('dotenv')
dotenv.config()
const {OAuth2Client} = require('google-auth-library');

var bodyParser = require('body-parser');
router.use(bodyParser.json());


const oAuth2Client = new OAuth2Client(
    process.env.CLIENT_ID,
    process.env.CLIENT_SECRET,
    'http://localhost:5173',
)


function getCode(url) {
    const codeRegex = /[?&]code=([^&]*)/;
    const matches = codeRegex.exec(url);
    if (matches && matches[1]) {
        return matches[1];
    } else {
        return false;
    }
}


router.post('/', async function (req, res, next) {
    try {
        res.header('Access-Control-Allow-Origin', 'http://localhost:5173')      // Block CORS
        res.header('Referrer-Policy', 'no-referrer-when-downgrade')

        const url = req.body.url; 
        const code = getCode(url);

        try {
            const tokens = await oAuth2Client.getToken(code);
            await oAuth2Client.setCredentials(tokens);
            if (oAuth2Client.credentials.tokens.access_token) {
                res.json({
                    authorized: true,
                });
            } else {
                res.json({
                    authorized: false,
                });
            }
        } catch {
            res.json({
                authorized: false,
            });
        }
    } catch {
        console.error('An oauth.js error happened: ', error);
    }
});


module.exports = router;