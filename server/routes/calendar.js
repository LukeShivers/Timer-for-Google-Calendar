var express = require('express');
var router = express.Router();
const dotenv = require('dotenv')
dotenv.config()
const { google } = require('googleapis')


const calendar = google.calendar({
    version: "v3",
    auth: "authPlaceholder",
})


router.get('/list', async (req, res) => {
    res.header('Access-Control-Allow-Origin', 'http://localhost:5173')
    
    const listOfCalendars = await calendar.calendarList.list()
    res.json(listOfCalendars)
})


router.get('/color', async (req, res) => {
    res.header('Access-Control-Allow-Origin', 'http://localhost:5173')
})


module.exports = router;