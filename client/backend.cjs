const express = require('express'); 
const { google } = require('googleapis');
const cors = require('cors')

const app = express();

app.use(cors({
    origin: 'http://localhost:5173', // Replace with your React app's origin
}));

const PORT = 8000;


// Defines a google.auth.OAuth2 object, which defines the parameters in the authorization request.
const oauth2Client = new google.auth.OAuth2(
    '750967188620-0a2m9hrpv3bqfg19ie4hlbj1u3id8ost.apps.googleusercontent.com',
    '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',
    'http://localhost:8000/google/redirect'
);


const calendar = google.calendar({
    version: 'v3',
    auth: oauth2Client,
});


app.get("/trial", (req, res) => {
    const user = ["Luke", "John", "Mathew"];
    res.send(user);
})


// Next is asking for permissions from a user to retrieve an access token.
// When user visits /google, I redirect them to a consent page. This generates the url for redirection to consent.
// If success, app reirects to redirect url in the google.auth.OAuth2 object 
app.get("/google", (req, res) => {
    const url = oauth2Client.generateAuthUrl({
        access_type: "offline",
        scope: ['https://www.googleapis.com/auth/calendar'],
    })
    res.redirect(url)
});


let userCredential;


app.get("/google/redirect", async (req, res) => {
    userCredential = req.query.code;

    const {tokens} = await oauth2Client.getToken(userCredential)
    oauth2Client.setCredentials(tokens);

    res.send("You've been authenticated!")
})

// Using the authenticated Google API client, get calendar events
app.get('/events', async (req, res) => {
    try {
        const response = await calendar.calendarList.list({
            'maxResults': 10,
            'showDeleted': false,
        });
        console.log(response.data)
        res.json(response.data);
    } catch (error) {
        console.error('Error:', error.message);
        res.status(500).send('Internal Server Error');
    }
});


// Refresh the access token
async function refreshAccessToken() {
    const {credentials} = await oauth2Client.refreshToken(userCredential);

    // Set the refreshed credentials on the OAuth2 client
    oauth2Client.setCredentials(credentials);
}

// Use a timer or schedule to refresh the token periodically
setInterval(refreshAccessToken, 1000 * 60 * 30); // Refresh every 30 minutes


app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));