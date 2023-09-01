# Meet app documentation

**Content**

- Projet description
- User interface
-  User stories and scenarios
 - Technical aspects 
 - App dependencies

 
## Projet description

*Meet* app was created to serve as a resource for users to find different events. Users can search for different types of coding events based on targeted cities. They can also specify how many events they want to display on their screen. All event information is presented visually with a dynamic scatter plot and pie chart, and in a list below the visuals.

*Meet* app can be broken down in the five following points:

 - **Who** — For any users who would like to know about coding events happening in different cities.
 - **What** — A progressive web app (PWA) with the ability to work offline and a serverless backend, developed using TDD and BDD techniques. 
 - **When** — Users are able to use Meet app whenever they want to view upcoming coding events for a specific city. 
 - **Where** — Meet app is hosted online and is shareable and installable. Users can access the app on their browser, or install it as a desktop app or mobile app. As it’s responsive, it displays well on any device sizes. The app can also be used even when users are offline.
 - **Why** — Serverless is the next generation of cloud infrastructure, PWA provides great user experience and performance and the TDD / BDD techniques ensure to have quality code and adequate test coverage.

## User interface

When users land on *Meet* app, the initial page with an input bar to look for a city and an input bar to specify the number of events to show is displayed. Once users start typing in the city input bar, a list of the corresponding cities matching the text entry appears, making the search easier and faster. Once users have selected a city, they can indicate, in the number of events input bar, how many events they want to see for that city (by default, 32 events are displayed). 

The events for the searched city are then displayed (through a graph and chart and through a list). In the list, general information for each event are shown by default (event's title, date / time and location). If users want more details on a specific event, they can click on it to expand the event's window and reveal more details, and then close the expanded event window to go back to the previous full list of events when done. 

All views are responsive so that Meet app can be used on any devices.

## User stories and scenarios

For the app's development phase, the following user stories, along with their respective scenarios written with the Gherkin syntax, have been created (the scenarios here being part of their related and respective larger user story and aiming at describing more precisely interactions between users and the app).

### User story 1 - Filter events by city

> As a **user**,   
> I should be able to **filter events by city**,  
> So that **I can see a list of events taking place in a specific cities**.

**Scenario 1.1** - When user hasn’t searched for a specific city, show upcoming events from all cities.

> -   **Given**  user hasn’t searched for any city;
> -   **When**  user is in the initial default view of the app;
> -   **Then**  user should see a list of upcoming events for all cities.

**Scenario 1.2** - User should see a list of suggestions when they search for a city.

> -   **Given**  user is in the initial default view of the app;
> -   **When**  user starts typing in the city search input field;
> -   **Then**  user should receive a list of cities (suggestions) that match what is typed.

**Scenario 1.3** - User can select a city from the suggested list.

> -   **Given**  user was typing a specific city (ex: Berlin) in the city search input field 
> -   **And**  the list of suggested cities is showing 
> -   **When**  user selects a city (ex: Berlin, Germany) from the  suggestion list;
> -   **Then**  user interface should be changed to that city (ex: Berlin, Germany) 
> -   **And**  user should receive a list of upcoming events in that city.

### User story 2 - Show/hide event details

> As a **user**,   
> I should be able to **show/hide event details**,  
> So that **I can see more details on a specific event when needed, and then go back to the previous general list of events when desired**.

**Scenario 2.1** - An event element is collapsed by default.

> -   **Given** user hasn’t clicked/expand an event element;
> -   **When** user is viewing upcoming events for all cities or upcoming events for a specific city;
> -   **Then** user should see a list of upcoming events all collapsed by default.

**Scenario 2.2** - User can expand an event to see details.

>  - **Given** user hasn’t clicked/expand an event element;
>  - **When** user is viewing upcoming events for all cities or upcoming events for a specific city
>  - **And** user clicks on a show details button for a specific event
>  - **Then** user should see the event all details.

**Scenario 2.3** - User can collapse an event to hide details.

>  -   **Given** user has clicked/expand an event element;
>  -   **When** When user clicks on the hide details button;
>  - **Then** user event view should collapse.

### User story 3 - Specify number of events

> As a **user**,   
> I should be able to **specify the number of events shown my screen**,  
> So that **I can see the number of events displayed according to my preference**.

**Scenario 3.1** - When user hasn’t specified a number, 32 events are shown by default.

> -   **Given** user hasn’t specified a specific number of events to be shown;
> -   **When** user is on initial default view (upcoming events for all cities) or has searched for a specific city;
> -   **Then** user should see 32 events shown by default.

**Scenario 3.2**- User can change the number of events displayed.

>  -   **Given** user specified a specific number of events to be shown (ex: 3);
>  -   **When** user is on initial default view (upcoming events for all cities) or has searched for a specific city;
>  - **Then** user should be able to see the specified number of events on screen (ex: 3).

### User story 4 - Use the app when offline

> As a **user**,   
> I should be able to **use the app when offline**,  
> So that **I can keep seeing some events data when there’s no internet connection**.

**Scenario 4.1** - Show cached data when there’s no internet connection.

>  -   **Given** user used the app with an internet connection, and then don't have it anymore;
>  -   **When** user is on initial default view (upcoming events forall cities), on a specific city view or on an event details view;
>  - **Then** user can still see the event(s) he viewed the last time he was online.
 
**Scenario 4.2** - Show error when user changes search settings (city, number of events).

>  -   **Given** user being offline but still seeing the event(s) he viewed last time he was online;
>  -   **When** user changes search settings (city, number of events...) while being offline;
>  - **Then** user sees an error message.

### User story 5 - Add an app shortcut to the home screen

> As a **user**,   
> I should be able to **add an app shortcut to my home screen**,  
> So that **I can access the app faster**.

**Scenario 5.1** - User can install the *Meet* app as a shortcut on their device home screen.

 >  -   **Given** user did not not have the app installed on home screen;
>  -   **When** user installs the app on device home screen;
>  - **Then** user sees the app on home screen and can use it as a shortcut to access it.

### User story 6 - Display charts visualizing event details

> As a **user**,   
> I should be able to **visualize event details on charts**,  
> So that **I can know the number of upcoming events in each city**.

**Scenario 6.1** - Display charts visualizing event details

>  -   **Given** user searched for a city;
>  -   **When** user clicks on a button to show the number of upcoming events in the searched city;
>  - **Then** user can see a chart with the number of upcoming events in the searched city.


## Technical aspects

*Meet* app is a serverless, progressive web application (PWA) built using React (with Create-React-App) and the test-driven development (TDD) and behavior-driven development (BDD) techniques. The application uses the Google Calendar API to fetch upcoming events in different cities.

Serverless functions in *Meet* app are used for the authorization process. More precisely, they are used to authorize the app to retrieve Google Calendar API event data. To access the events from the Google Calendar API, users need to have an access token delivered from an authorization server (in case of *Meet* app, the authorization server is Google OAuth). For users / *Meet* app to get this access token from the authorization server, serverless functions are used, using the cloud-service provider AWS Lambda. 

Two things are first required to launch the authorization process and make it possible for users / *Meet* app to eventually access the Google Calendar API data: 

- A consumer key (client_id)
- A consumer secret (client_secret)

The consumer key and consumer secret are used to identify the consumer that wants to use the Google OAuth authorization server (the consumer here being a serverless function hosted on AWS Lambda). When users go on *Meet* app for the first time, the consumer uses the key and secret to start the process of requesting access from the authorization server, which then lets users know about this request (a Google consent screen appears on their UI).

When users provide their credentials to log in into their Google account and grants consent to *Meet* app through this consent screen, the authorization server authenticates the user/the app and generate/send back an authorization code the user/the app, which is later exchanged for an access token. The app can then use this token (on behalf of the user) to request and access the protected resources (event data) from the Google Calendar API and display them in the app UI. This is possible since at this point, the Google Calendar API will recognize the user’s token in requests sent to it and subsequently provide the requested list of events.

The access token is required for the *Meet* app to work because the Google Calendar API is a protected API. Protected APIs can only be called by authenticated apps, so by apps that have a valid token issued by the API provider. Users / app sending a request to access the Google Calendar API events without a valid token would get an error message.

Serveless functions for the authorization process with *Meet* app are particularly useful as they allow to avoid the need of building and maintaining an entire server. With AWS Lambda, the operational responsibilities for server management, scaling, and maintenance are shifted to the cloud provider, and the running costs are more effective (since developers only pay for the resources used).

The specific technologies and tools used in this project are the following: 

 - React
 - JavaScript
 - CSS
 - AWS Lambda
 - Jest
  - Cucumber
 - Puppeteer
 - Atatus
 - Recharts
 - Google Console API
  - Lighthouse (from Google DevTools)


## App dependencies

The following dependencies are required for the *Meet* app to work:

  - testing-library/jest-dom: ^5.17.0
 -  testing-library/react: ^13.4.0
 -  testing-library/user-event: ^14.4.3
 - atatus-spa: ^4.6.0
 - react: ^18.2.0
  - react-dom: ^18.2.0
 -  react-scripts: 5.0.1
 -  recharts: ^2.7.3
 - web-vitals: ^2.1.4
 - workbox-background-sync: ^6.6.0
  - workbox-broadcast-update: ^6.6.0
 - workbox-cacheable-response: ^6.6.0
 - workbox-core: ^6.6.0
 - workbox-expiration: ^6.6.0
 - workbox-google-analytics: ^6.6.0
  - workbox-navigation-preload: ^6.6.0
 - workbox-precaching: ^6.6.0
 - workbox-range-requests: ^6.6.0
 - workbox-routing: ^6.6.0
 - workbox-strategies: ^6.6.0
  - workbox-streams: ^6.6.0
 
 For devDependencies

  - gh-pages: ^5.0.0
 - jest-cucumber: ^3.0.1
  - puppeteer: ^18.1.0
 