var express = require('express');
var router = express.Router();
const dotenv = require('dotenv')
dotenv.config()
const { google } = require('googleapis')


const calendar = google.calendar({
    version: "v3",
    auth: "authPlaceholder",
})


async function getUserData(access_token) {
    try {
        const response = await fetch(`https://www.googleapis.com/oauth2/v3/userinfo?access_token=${access_token}`);
        const data = await response.json();
        console.log('data',data);
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
}


router.get('/list', async (req, res) => {
    res.header('Access-Control-Allow-Origin', 'http://localhost:5173')
    
    const listOfCalendars = await calendar.calendarList.list()
    res.json(listOfCalendars)
})


router.get('/color', async (req, res) => {
    res.header('Access-Control-Allow-Origin', 'http://localhost:5173')
})


module.exports = router;