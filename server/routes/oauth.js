var express = require('express');
var router = express.Router();
const dotenv = require('dotenv')
dotenv.config()
const {OAuth2Client} = require('google-auth-library');
const { google } = require('googleapis')


async function getUserData(access_token) {
    try {
        const response = await fetch(`https://www.googleapis.com/oauth2/v3/userinfo?access_token=${access_token}`);
        const data = await response.json();
        // console.log('data',data);
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

const oAuth2Client = new OAuth2Client(                          // Add oAuth2Client
    process.env.CLIENT_ID,
    process.env.CLIENT_SECRET,
    'http://localhost:3000/oauth',
);

router.use('/', async function (req, res, next) {
    const requestCode = req.query.code                              // Get the code

    const tokens = await oAuth2Client.getToken(requestCode);        // Get access & refresh tokens out of the request code 
    await oAuth2Client.setCredentials(tokens);                      // Set credentials for oAuth2Client

    /* ------------------------------------------------------
    
    Problem occurs here, I need to get the oAuth2Client object
    out of this route, AFTER credentials have been set in it 
    so that I can use it elsewhere in the project. For example,
    in the below route (/tokens), which send data back to the 
    client so the client can open and redirect the app to a
    protected route. And I also need to send oAuth2CLient to
    the ./calendar.js file where it can be used to access the
    google calendar API and get data from / write to that.

    ------------------------------------------------------ */

    res.redirect('http://localhost:5173/')
});


router.get('/tokens', function(req, res, next) {
    // Wait for req.clientToken to be set
})


module.exports = router;