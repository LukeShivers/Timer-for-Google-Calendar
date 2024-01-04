const express = require('express'); 
const { google } = require('googleapis');

const app = express();

const PORT = 8000;

// const calendar = google.calendar({
//     version : "v3",
//     auth : "AIzaSyAXpJVR5llvtNJYiWPWPZ_aP38HAqkYr8I"
// })


const oauth2Client = new google.auth.OAuth2(
    '750967188620-0a2m9hrpv3bqfg19ie4hlbj1u3id8ost.apps.googleusercontent.com',
    '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',
    'http://localhost:8000/google/redirect'
);

const scopes = ['https://www.googleapis.com/auth/calendar'];

app.get("/google", (req, res) => {
    const url = oauth2Client.generateAuthUrl({
        access_type: "offline",
        scope: scopes,
    })

    res.redirect(url)
});

app.get("/google/redirect", (req, res) => {
    console.log(req)
    // const code = req.query.code;

    // const {tokens} = await oauth2Client.getToken(code)
    // oauth2Client.setCredentials(tokens);

    res.send("its working!")
})

// app.get('/schedule_event', (req, res) => {
//     calendar.events
// })


app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));