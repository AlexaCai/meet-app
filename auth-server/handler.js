//***Added by default when the serverless template code is generate. It makes the code in the file more strict, reducing some of JavaScript’s sloppyness.
'use strict';

//***The required Google package are imported (“googleapis”), along with the Google Calendar.
const { google } = require("googleapis");
const calendar = google.calendar("v3");

//***Scopes allows to set access levels for Google APIs, depending on the level of access needed. When setting up the required infrastructure in the Google console previously, “read-only access” was defined as the scope (OAuth 2.0 Scopes for Google APIs - /auth/calendar.events.public.readonly was choose for the project).
const SCOPES = ["https://www.googleapis.com/auth/calendar.events.public.readonly"];

//***Process.env means the value being referred to is in the config.json file (environment : client_ID, secret_ID, calendar_ID). This is a best practice as it keeps the API secrets hidden.
const { CLIENT_SECRET, CLIENT_ID, CALENDAR_ID } = process.env;

//***The first step in the OAuth process is to generate a URL so users can log in with Google and be authorized to see the calendar events data. After logging in, users will receive a code as a URL parameter. 
const redirect_uris = [
  "https://alexacai.github.io/meet-app/"
];

//***From the Google API, using the new operator, a new instance of the google.auth.OAuth2 method was called and created. This instance accepts CLIENT_ID, CLIENT_SECRET, and the redirect URL as parameters.
const oAuth2Client = new google.auth.OAuth2(
  CLIENT_ID,
  CLIENT_SECRET,
  //***redirect_uris[0] here come from const redirect_uris above (...[0] because "https://alexacai.github.io/meet-app/" being the first element of the const redirect_uris array above - so position 0).
  redirect_uris[0]
);

//***The getAuthURL function’s logic was created and exported using Node.js module.exports. Another notable module used in the getAuthURL function is the OAuth2 client, which allows to seamlessly retrieve an access token, refresh it, and retry the request.
module.exports.getAuthURL = async () => {

  //***To generate an authentication URL from Google API using the instance stored in oAuth2Client, it is necessary to call the 'oAuth2Client.generateAuthUrl' method and pass the “access_type” and scope (that was set in the variable scopes earlier) as an object.
  const authUrl = oAuth2Client.generateAuthUrl({
    access_type: "offline",
    scope: SCOPES,
  });

  //***The return part of the function contains the statusCode, headers, and body.
  return {
    statusCode: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Credentials': true,
    },
    body: JSON.stringify({
      authUrl,
    }),
  };
};


module.exports.getAccessToken = async (event) => {

  //***Decode authorization code extracted from the URL query (received for getAuthURL).
  const code = decodeURIComponent(`${event.pathParameters.code}`);

  return new Promise((resolve, reject) => {

    //***Exchange authorization code for access token with a “callback” after the exchange.
    //***The callback in this case is an arrow function with the results as parameters: “error” and “response”.
    oAuth2Client.getToken(code, (error, response) => {
      if (error) {
        return reject(error);
      }
      return resolve(response);
    });
  })
    .then((results) => {
      //***Respond with OAuth token.
      return {
        statusCode: 200,
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Credentials': true,
        },
        body: JSON.stringify(results),
      };
    })
    .catch((error) => {
      return {
        statusCode: 500,
        body: JSON.stringify(error),
      };
    });
};


//***Named exactly the same as the function defined in serverless.yml (getCalendarEvents).
module.exports.getCalendarEvents = async (event) => {

  //***Declared an access_token variable and get the token.
  const access_token = decodeURIComponent(`${event.pathParameters.access_token}`);
  //***Set the access token as credentials.
  oAuth2Client.setCredentials({ access_token });

  return new Promise((resolve, reject) => {
    calendar.events.list(
      {
        calendarId: CALENDAR_ID,
        auth: oAuth2Client,
        timeMin: new Date().toISOString(),
        singleEvents: true,
        orderBy: "startTime",
      },
      (error, response) => {
        if (error) {
          reject(error);
        } else {
          resolve(response);
        }
      }
    );
  })
    .then((results) => {
      //***Respond with OAuth token.
      return {
        statusCode: 200,
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Credentials': true,
        },
        body: JSON.stringify({ events: results.data.items }),
      };
    })
    .catch((error) => {
      return {
        statusCode: 500,
        body: JSON.stringify(error),
      };
    });
}