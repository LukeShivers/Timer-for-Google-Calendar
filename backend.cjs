const PORT = 8000;
const express = require('express');
const cors = require('cors');
const axios = require('axios');
require('dotenv').config();

const app = express();

app.use(express.json());
app.use(cors());

app.post('/authorization', async (req, res) => {
    try {
        const gapi = await axios.get('https://apis.google.com/js/api.js');
        const gis = await axios.get('https://accounts.google.com/gsi/client');

        const CLIENT_ID = '750967188620-0a2m9hrpv3bqfg19ie4hlbj1u3id8ost.apps.googleusercontent.com';
        const API_KEY = 'AIzaSyAXpJVR5llvtNJYiWPWPZ_aP38HAqkYr8I';
        const DISCOVERY_DOC = 'https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest';
        const SCOPES = 'https://www.googleapis.com/auth/calendar.readonly';

        let tokenClient;        // Equals Null at this point

        gapi.data.load('client', initializeGapiClient);

        async function initializeGapiClient() {
            await gapi.client.init({        // Pauses execution until gapi object -> client object -> init function (1 argument), completes.
                apiKey: API_KEY,
                discoveryDocs: [DISCOVERY_DOC],
            });
        }

        tokenClient = google.accounts.oauth2.initTokenClient({  // Initializes a 'tokenClient' using the initTokenClient method provided by google.accounts.oauth2.
            client_id: CLIENT_ID,
            scope: SCOPES,
            callback: '', // defined on line 89.
        });

        res.json(gapi.data)
    } catch (error) {
        res.status(500).json({ error: 'internal server error' })
    }
})

app.listen(8000, () => console.log(`Server is running on port ${PORT}`));