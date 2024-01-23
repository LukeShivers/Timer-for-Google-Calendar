var express = require('express');
var router = express.Router();
const dotenv = require('dotenv')
dotenv.config()
const { google } = require('googleapis')
const {OAuth2Client} = require('google-auth-library');

const calendar = google.calendar({
    version: "v3",
    auth: process.env.API_KEY,
})

const oAuth2Client = new OAuth2Client(
    process.env.CLIENT_ID,
    process.env.CLIENT_SECRET,
    'http://localhost:3000/oauth'
);

router.get('/default', async (req, res) => {
    res.header('Access-Control-Allow-Origin', 'http://localhost:5173')
        
    const result = await calendar.calendarList.list({
        auth: oAuth2Client
    })
    console.log(result)

    res.json(result)
})

router.get('/', async (req, res) => {

})

module.exports = router;