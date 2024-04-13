var express = require('express');
var router = express.Router();
const dotenv = require('dotenv')
dotenv.config()
const { google } = require('googleapis')


var bodyParser = require('body-parser');
router.use(bodyParser.json());


// Set Auth for entire google object
/*
google.options({
    auth: oAuth2Client
});
*/


const oAuth2Client = new google.auth.OAuth2(
    process.env.CLIENT_ID,
    process.env.CLIENT_SECRET,
    'http://localhost:5173',
)


async function getUserData(access_token) {
    try {
        const response = await fetch(`https://www.googleapis.com/oauth2/v3/userinfo?access_token=${access_token}`);
        const data = await response.json();
        console.log('data',data);
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
}


router.post('/', async (req, res) => {
    res.header('Access-Control-Allow-Origin', 'http://localhost:5173')      // Block CORS
    res.header('Referrer-Policy', 'no-referrer-when-downgrade')

    try {
        const tokenModel = req.body.token
        await oAuth2Client.setCredentials(tokenModel)
        const calendar = google.calendar({
            version:"v3",
            auth: oAuth2Client
        })
        const calList = await calendar.calendarList.list();
        const calendars = calList.data.items
        let array = [];
        calendars.forEach(element => {
            array.push(element.summary)
        });
        console.log(array)
        // calendars.map((cal, i) => {
        //     const start = event.start.dateTime || event.start.date;
        //     console.log(`${start} - ${event.summary}`);
        // });
        // const events = res.data.items;
        // if (!events || events.length === 0) {
        //     console.log('No upcoming events found.');
        // }

        // console.log('Upcoming 10 events:');
        // events.map((event, i) => {
        //     const start = event.start.dateTime || event.start.date;
        //     console.log(`${start} - ${event.summary}`);
        // });
        
    
        res.json({
            data: "Good response"
        })
    } catch (err) {
        res.status(500).json({ error: 'Internal /calendar Server Error' });
    }
})


module.exports = router;