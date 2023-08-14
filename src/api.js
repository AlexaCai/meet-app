//***src/api.js

import mockData from './mock-data';

/**
 *
 * @param {*} events:
 * The following function should be in the “api.js” file.
 * This function takes an events array, then uses map to create a new array with only locations.
 * It will also remove all duplicates by creating another new array using the spread operator and spreading a Set.
 * The Set will remove all duplicates from the array.
 */

export const extractLocations = (events) => {
  const extractedLocations = events.map((event) => event.location);
  const locations = [...new Set(extractedLocations)];
  return locations;
};


//***Functions there are used/called in this file.


//***Function to check the token’s validity (used/called above in export const getAccessToken). If it’s not valid, then redirect logic to send the user to the Google Authorization screen.
const checkToken = async (accessToken) => {
  const response = await fetch(
    `https://www.googleapis.com/oauth2/v1/tokeninfo?access_token=${accessToken}`
  );
  const result = await response.json();
  return result;
};

//***Function for removeQuery (used/called above in export const getEvents).
const removeQuery = () => {
  let newurl;
  if (window.history.pushState && window.location.pathname) {
    newurl =
      window.location.protocol +
      "//" +
      window.location.host +
      window.location.pathname;
    window.history.pushState("", "", newurl);
  } else {
    newurl = window.location.protocol + "//" + window.location.host;
    window.history.pushState("", "", newurl);
  }
};

//***Function for getToken (used/called above in export const getAccessToken).
const getToken = async (code) => {
  const encodeCode = encodeURIComponent(code);
  const response = await fetch(
    'https://l0muw3nkek.execute-api.ca-central-1.amazonaws.com/dev/api/token' + '/' + encodeCode
  );
  const { access_token } = await response.json();
  access_token && localStorage.setItem("access_token", access_token);

  return access_token;
};


//***Logics using the function defined above.


//***Fetch the list of all events (either from mock-data.js or Google Calendar API).
export const getEvents = async () => {
  
  //***If using localhost, return the mock data; otherwise, you use the real API.
  if (window.location.href.startsWith('http://localhost')) {
    return mockData;
  }

  //***Code for loading that list when the user is offline. This API (!navigator.onLine) checks whether a user is online and returns a boolean.
  //***If true (the user is online), the app will request data from the Google Calendar API. However, if false (the user is offline - ex: Wi-Fi has been turned off), the app will load the event list data stored in localStorage. The stored event list is parsed and returned as events.
  if (!navigator.onLine) {
    const events = localStorage.getItem("lastEvents");
    return events ? JSON.parse(events) : [];
  }

  const token = await getAccessToken();
  if (token) {
    //***removeQuery(); here removes the code from the URL once finished with it. As a result, the URL will look less complicated to the user (i.e., it will remove unnecessary query parameters). The function manually sets the browser's URL being more simple, removing any other text following the base URL.
    removeQuery();
    const url = "https://l0muw3nkek.execute-api.ca-central-1.amazonaws.com/dev/api/get-events" + "/" + token;
    const response = await fetch(url);
    const result = await response.json();
    if (result) {
      //***JSON.stringify(result.events) function call is necessary because events is an array, but localStorage can only store strings. JSON.stringify() function is therefore necessary as it converts the list of events into a string, allowing it to be stored in localStorage.
      //***The (stringified) list of events is stored under the key 'lastEvents'.
      localStorage.setItem("lastEvents", JSON.stringify(result.events));
      return result.events;
    } else return null;
  }
};



//***Get the access token to access Google Calendar API data (Google Calendar API uses OAuth2 to protect its API, and in order to call its API methods, it is neccessary to provide a valid access token).
export const getAccessToken = async () => {
  //***First thing : try to retrieve the access token (when a user opens the app, we don’t know yet whether the user is opening the app for the first time or if they’ve opened it before. If the user’s already received an access token in the past, the app coudl reuse it).
  const accessToken = localStorage.getItem('access_token');
  //***If no access token is found in localStorage, the app should redirect the user to the Google Authorization screen so they can get their authorization code. Google will then redirect the user back to the app with the code, which can be use to retrieve the access token from the Lambda functions on the authorization server.
  //***Code checks whether an access token was found.
  const tokenCheck = accessToken && (await checkToken(accessToken));
  //***If no token is found (!accessToken || tokenCheck.error), the code then checks for an authorization code.
  if (!accessToken || tokenCheck.error) {
    await localStorage.removeItem("access_token");
    const searchParams = new URLSearchParams(window.location.search);
    const code = await searchParams.get("code");
    //***If no authorization code is found (!code), the user is automatically redirected to the Google Authorization screen, where they can sign in and receive their code.
    if (!code) {
      const response = await fetch(
        "https://l0muw3nkek.execute-api.ca-central-1.amazonaws.com/dev/api/get-auth-url"
      );
      const result = await response.json();
      const { authUrl } = result;
      return (window.location.href = authUrl);
    }
    return code && getToken(code);
  }
  return accessToken;
};