var express = require('express');
var router = express.Router();
const dotenv = require('dotenv')
dotenv.config()
const {OAuth2Client} = require('google-auth-library');


async function getUserData(access_token) {
    try {
        const response = await fetch(`https://www.googleapis.com/oauth2/v3/userinfo?access_token=${access_token}`);
        const data = await response.json();
        // console.log('data',data);
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

let clientToken;

// Middleware
router.use((req, res, next) => {
    clientToken = null;
    next();
})


const oAuth2Client = new OAuth2Client(
    process.env.CLIENT_ID,
    process.env.CLIENT_SECRET,
    'http://localhost:3000/oauth'
);


// Get token
router.get('/', async function(req, res, next) {

    // Get the code
    const code = req.query.code

    try {
        // Get tokens out of the code 
        const tokens = await oAuth2Client.getToken(code);

        // Set token in credentials
        await oAuth2Client.setCredentials(tokens.tokens);
        // console.log('credentials', oAuth2Client.credentials);

        // Update middleware
        clientToken = await oAuth2Client.credentials.access_token

        // res.cookie('accessToken', user.access_token, { httpOnly: true });

        await getUserData(oAuth2Client.credentials.access_token);

    } catch (error) {
        console.error('Error during callback handling:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }

    res.redirect(303, 'http://localhost:5173/');
})


router.get('/tokens', async function(req, res, next) {
    res.header('Access-Control-Allow-Origin', 'http://localhost:5173')

    const waitForToken = () => {
        if (clientToken) {
            console.log("/tokens update: ", clientToken);
            res.json({
                token: clientToken
            });
        } else {
            setTimeout(waitForToken, 250);
        }
    }
    waitForToken();
})

module.exports = router;