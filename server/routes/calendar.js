var express = require("express");
var router = express.Router();
const dotenv = require("dotenv");
dotenv.config();
const { google } = require("googleapis");
var bodyParser = require("body-parser");
router.use(bodyParser.json());
const { DateTime } = require("luxon");

const oAuth2Client = new google.auth.OAuth2(
  process.env.CLIENT_ID,
  process.env.CLIENT_SECRET,
  "http://localhost:5173"
);

const calendar = google.calendar({
  version: "v3",
  auth: oAuth2Client,
});

// Google Calendar API User Data Scope
/*
async function getUserData(access_token) {
  try {
    const response = await fetch(
      `https://www.googleapis.com/oauth2/v3/userinfo?access_token=${access_token}`
    );
    const data = await response.json();
    console.log("data", data);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
}
*/

router.post("/", async (req, res) => {
  res.header("Access-Control-Allow-Origin", "http://localhost:5173"); // Block CORS
  res.header("Referrer-Policy", "no-referrer-when-downgrade");

  try {
    const tokenModel = req.body.token;
    await oAuth2Client.setCredentials(tokenModel);
    const calList = await calendar.calendarList.list();
    const calendars = calList.data.items;
    // console.log(calendars);

    let array = [];
    calendars.forEach((element) => {
      if (element.accessRole == "owner") {
        array.push({
          id: element.id,
          summary: element.summary,
          colorId: element.colorId,
          backgroundColor: element.backgroundColor,
          accessRole: element.accessRole,
          primary: element.primary,
        });
      }
    });

    res.status(200).json({
      data: array,
    });
  } catch (err) {
    res.status(500).json({ error: `Internal /calendar Server Error: ${err}` });
  }
});

router.post("/create", (req, res) => {
  res.header("Access-Control-Allow-Origin", "http://localhost:5173"); // Block CORS
  res.header("Referrer-Policy", "no-referrer-when-downgrade");

  try {
    const client = req.body;

    const iananTimeZone = DateTime.local().zoneName;

    const event = {
      summary: client.summary,
      description: client.description,
      start: {
        dateTime: client.startTime,
        timeZone: iananTimeZone,
      },
      end: {
        dateTime: client.endTime,
        timeZone: iananTimeZone,
      },
    };

    calendar.events.insert(
      {
        calendarId: client.calendarId,
        resource: event,
      },
      function (err, event) {
        if (err) {
          console.error(
            "There was an error contacting the Calendar service: " + err
          );
          return;
        }
        console.log("Event created: %s", event.htmlLink);
      }
    );

    res.status(200).json({
      data: "event creation: successful",
    });
  } catch (err) {
    res
      .status(500)
      .json({ error: `Internal /calendar/create Server Error: ${err}` });
  }
});

module.exports = router;
