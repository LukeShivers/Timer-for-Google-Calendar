import { useEffect } from 'react';
import Google from '../assets/Google.svg';
// import useAuth from '../hooks/useAuth'
import AuthContext from "../contexts/AuthProvider";


/* --------------------------------



-------------------------------- */



export default function Authorization() {
    const { auth, setAuth } = useContext(AuthContext);

    async function fetchAuthUrl () {
        const response = await fetch('http://localhost:3000/requests', {
            method: 'post'
        });
        const data = await response.json();
        console.log("Auth URL: ", data)
        naviagte(data.url);

        await tokens();
        // getCookies();
    }


    function naviagte (url) {
        window.location.href = url
    }


    async function tokens () {
        const response = await fetch("http://localhost:3000/oauth/tokens", {
            method: 'get'
        });
        const data = await response.json();
        console.log("credentials: ", data.token)
        setAuth({ data });
    }

    function test () {
        setAuth("xuvboienrpbovm")
        console.log(auth);
    }


    // async function getCookies () {
    //     const cookieResponse = await fetch("http://localhost:3000/cookie");
    //     const cookieData = await cookieResponse.text();
    //     console.log("Cookie Data: ", cookieData);
    // }


    // function getCookie (name) {
    //     const match = document.cookie.match(new RegExp('(^| )' + name + '=([^;]+)'));
    //     return match ? match[2] : null;
    // }


    // function printCookie () {
    //     const cookieAccessToken = getCookie('accessToken');
    //     console.log(cookieAccessToken)
    //     setAuth({ cookieAccessToken });
    // }


    // useEffect(() => {

    //     const scriptsContainer = document.getElementById('scriptsContainer');

    //     const apiScript = document.createElement('script');
    //     apiScript.src = 'https://apis.google.com/js/api.js';
    //     apiScript.async = true;
    //     apiScript.defer = true;
    //     apiScript.onload = gapiLoaded;
    //     scriptsContainer.appendChild(apiScript);


    //     const gsiScript = document.createElement('script');
    //     gsiScript.src = 'https://accounts.google.com/gsi/client';
    //     gsiScript.async = true;
    //     gsiScript.defer = true;
    //     gsiScript.onload = gisLoaded;
    //     scriptsContainer.appendChild(gsiScript);

    //     const CLIENT_ID = '750967188620-0a2m9hrpv3bqfg19ie4hlbj1u3id8ost.apps.googleusercontent.com';
    //     const API_KEY = import.meta.env.VITE_API_KEY;
    //     const DISCOVERY_DOC = 'https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest';
    //     const SCOPES = 'https://www.googleapis.com/auth/calendar.readonly';

    //     const authorizeButton = document.getElementById('authorize_button');
    //     authorizeButton.addEventListener('click', handleAuthClick);
    //     authorizeButton.style.visibility = 'hidden';


    //     let tokenClient;        // Equals Null at this point
    //     let gapiInited = false;     // Flag used to track if gapi has been initalized yet
    //     let gisInited = false;      // Flag
                                        
        
    //     function gapiLoaded() {     // gapi object -> Load function (takes 2 arguments) -> calls the Load function with the parameters 'client' and initializeGapiClient function. No idea what it does with those parameters.
    //         gapi.load('client', initializeGapiClient);
    //     }


    //     async function initializeGapiClient() {
    //         await gapi.client.init({        // Pauses execution until gapi object -> client object -> init function (1 argument), completes.
    //             apiKey: API_KEY,
    //             discoveryDocs: [DISCOVERY_DOC],
    //         });
    //         gapiInited = true; // If gapi.client.init method successfully initializes the Google API client with the API key and an array of discovery documents. This is true (which tracks weathe rit was successful).
    //         maybeEnableButtons();
    //     }


    //     function gisLoaded() {
    //         tokenClient = google.accounts.oauth2.initTokenClient({  // Initializes a 'tokenClient' using the initTokenClient method provided by google.accounts.oauth2.
    //             client_id: CLIENT_ID,
    //             scope: SCOPES,
    //             callback: '', // defined on line 89.
    //         });
    //         gisInited = true;                                       // If tokenClient is successfully initilaized, this is set to true (which tracks weather the initilaization was successful).
    //         maybeEnableButtons();
    //     }


    //     function maybeEnableButtons() {                             // Makes the authorize button visible after all librarys are loaded.
    //         if (gapiInited && gisInited) {
    //             authorizeButton.style.visibility = 'visible';
    //         }
    //     }
        
        
    //     // Set Up Complete


    //     function handleAuthClick() {
    //         tokenClient.callback = async (resp) => {                                    // Takes the key 'callback' from the 'tokenClient' object and assigns an asynchronous function that takes a parameter resp.
    //             if (resp.error !== undefined) {                                         // This block checks if an error occured during the authentication process.
    //                 throw (resp);
    //             }
    //             await listUserCalendars();
    //             updateCalLoad(gapi.client.getToken().access_token);
    //         };
    //         if (gapi.client.getToken() === null) {                                  // Prompt the user to select a Google Account and ask for consent to share their data when establishing a new session.
    //             tokenClient.requestAccessToken({prompt: 'consent'});
    //         } else {
    //             tokenClient.requestAccessToken({prompt: ''});                           // Skips display of account chooser and consent dialog for an existing session.
    //         }
    //     }


    //     updateSignOut(() => {
    //         const token = gapi.client.getToken();
    //         if (token !== null) {
    //           google.accounts.oauth2.revoke(token.access_token);
    //           gapi.client.setToken('');
    //           updateCalLoad(gapi.client.getToken());
    //         }
    //     });


    //     async function listUserCalendars() {
    //         let response;
    //         try {
    //             const request = {
    //                 'maxResults': 10,
    //                 'showDeleted': false,
    //             };
    //             response = await gapi.client.calendar.calendarList.list(request);
    //         } catch (err) {
    //             console.log(err.message)
    //             return;
    //         }

    //         const calendars = response.result.items;
    //         let calendarArray = [];

    //         Object.values(calendars).forEach((entry) => {
    //             if (entry.accessRole === "owner") {
    //                 const calendarData = {
    //                     'summary': entry.summary,
    //                     'backgroundColor': entry.backgroundColor,
    //                     'primary': false,
    //                 }
    //                 if (entry.primary) {
    //                     calendarData.primary = true;
    //                 }
    //                 calendarArray.push(calendarData);
    //             }
    //         });
    //         updateData(calendarArray);
    //     }


    //     function postNewEvent() {
    //         let event = {
    //             'summary' : '',     // (Form.jsx)
    //             'colorId' : '',     // (Form.jsx)
    //             'description' : '',     // (Form.jsx)
    //             'start' : {             // (DigitalCLock.jsx)
    //                 'dateTime' : '',    // (DigitalCLock.jsx)
    //                 'timezone': ''      // (DigitalCLock.jsx)
    //             },
    //             'end' : {               // (DigitalCLock.jsx)
    //                 'dateTime' : '',    // (DigitalCLock.jsx)
    //                 'timezone': ''      // (DigitalCLock.jsx)
    //             },
    //         };
    //         let request = gapi.client.calendar.events.insert({      // (Authorization.jsx)
    //             'calendarId': '',       // (Form.jsx)
    //             'resource': event
    //         });
    //         request.execute(function(event) {
    //             appendPre('Event created: ' + event.htmlLink);
    //         });
    //     }


    //     return () => {
    //         if (authorizeButton) {
    //             authorizeButton.removeEventListener('click', handleAuthClick);          // Remove event listener
    //         }
    //     };
    // }, []);

    
    return (
        <>
            <div onClick={() => fetchAuthUrl()} id="authorize_button" className='flex justify-center items-center w-[250px] h-[50px] py-[12px] px-[18px] bg-off-white rounded-[100px] ml-[154px] mt-[55px] cursor-pointer'>
                <div className='flex justify-between items-center w-[214px] h-[50px]'>
                    <img src={Google} alt="/" />
                    <span className='font-semibold font-poppins'>Continue With Google</span>
                </div>
            </div>

            <div onClick={test} id="authorize_button" className='flex justify-center items-center w-[250px] h-[50px] py-[12px] px-[18px] bg-off-white rounded-[100px] ml-[154px] mt-[55px] cursor-pointer'>
                <div className='flex justify-between items-center w-[214px] h-[50px]'>
                    <span className='font-semibold font-poppins'>Test Reroute</span>
                </div>
            </div>
        </>
    )
}