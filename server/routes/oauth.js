var express = require('express');
var router = express.Router();
const dotenv = require('dotenv')
dotenv.config()
const {google} = require('googleapis');
var bodyParser = require('body-parser');
router.use(bodyParser.json());


function searchParam(url) {
    const urlParams = new URLSearchParams(url);
    return urlParams.get('code');
}


const oAuth2Client = new google.auth.OAuth2(
    process.env.CLIENT_ID,
    process.env.CLIENT_SECRET,
    'http://localhost:5173',
)


router.post('/', async function (req, res, next) {
    try {
        res.header('Access-Control-Allow-Origin', 'http://localhost:5173')      // Block CORS
        res.header('Referrer-Policy', 'no-referrer-when-downgrade')


        let token;
        const params = req.body.params;


        try {
            const code = searchParam(params);
            const {tokens} = await oAuth2Client.getToken(code);

            token = tokens
        } catch (err) {
            token = false;
        }

        res.json({
            token: token,
        });
    } catch {
        console.error('An oauth.js error happened: ', error);
    }
});


module.exports = router;