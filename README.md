# Meet app documentation

**Content**

- Projet description
- User interface
-  User stories and scenarios
 - Technical aspects 
 - App dependencies
  - Github repositorie and Github Pages

 
## Projet description

*Meet* app was created to serve as a reference in the domain of event searching and entertainment. Users can go on*Meet* app to have access to different informations on upcoming events in a specific searched city (or by default, on all cities when a user hasn't searched for a specific city). Once users see all events from all cities or from a specific searched city on their UI, they can click on a event to have access to more details. 

*Meet* app can be breakdown in the five following points:

 - **Who** — For users who could be anyone.
 - **What** — A progressive web app with the ability to work offline and a serverless backend developed using a TDD technique. 
 - **When** — Users of this app will be able to use it whenever they want to view upcoming events for a specific city. 
 - **Where** — The server is a serverless function hosted by a cloud provider (AWS). The application itself is also hosted online to make it shareable and installable. It can be used even when the user is offline. As it’s responsive, it displays well on any device. 
 - **Why** — Serverless is the next generation of cloud infrastructure, PWA provides great user experience and performance, and the TDD technique ensures to have quality code and adequate test coverage.

## User interface

More concretly, when users land on *Meet* app, the initial default page with a search input field to look for a city is displayed. Once users start typing in the search field, a list of corresponding cities matching with the entry pops up, making the search easier and faster.

Once users have entered and selected for a city, he is invited to precise how many events he wants to see display for that city (by default, 32 events are displayed). A list of events for the searched city is then displayed. General information for each event are accessible up to this point, and if users want more details on a specific event, he can click on it to access more information, and then close de detailed view to go back full list of events. 

User can also display a chart showing the number of upcoming events in each city.

All views are responsive, using a combination of **~~ABC et DEF.~~**

## User stories and scenarios

To help the development of the app, the following users stories, along with their respective scenarios written with the Gherkin syntax have been created (the scenarios here being part of a larger user story describing interactions between a user and the application) .

### User story 1 - Filter events by city

> As a **user**,   
> I should be able to **filter events by city**,  
> So that **I can see a list of events taking place in a specific cities**.

**Scenario 1.1** - When user hasn’t searched for a specific city, show upcoming events from all cities.

> -   **Given**  user hasn’t searched for any city;
> -   **When**  user is on the initial default view of the app;
> -   **Then**  user should see a list of upcoming events for all cities.

**Scenario 1.2** - User should see a list of suggestions when they search for a city.

> -   **Given**  user is on the initial default view of the app;
> -   **When**  user starts typing in the city search input field;
> -   **Then**  user should receive a list of cities (suggestions) that match what is typed.

**Scenario 1.3** - User can select a city from the suggested list.

> -   **Given**  user was typing a specific city (ex: Toronto) in the city search input field _AND_  the list of suggested cities is showing;
> -   **When**  user selects a city (ex: Toronto, Canada) from the  suggestion list;
> -   **Then**  user interface should be changed to that city (ex: Toronto, Canada)  _AND_  user should receive a list of upcoming events in that city.

### User story 2 - Show/hide event details

> As a **user**,   
> I should be able to **show/hide event details**,  
> So that **I can see more details on a specific event when needed, and then go back to the previous general list of events when desired**.

**Scenario 2.1** - An event element is collapsed by default.

> -   **Given** user hasn’t click/expand an event element;
> -   **When** user is viewing upcoming events for all cities or upcoming events for a specific city;
> -   **Then** user should see a list of upcoming events all collapsed by default.

**Scenario 2.2** - User can expand an event to see details.

>  - **Given** user hasn’t click/expand an event element;
>  - **When** user is viewing upcoming events for all cities or upcoming events for a specific city and click on a specific event;
>  - **Then** user should see the event all details.

**Scenario 2.3** - User can collapse an event to hide details.

>  -   **Given** user has click/expand an event element;
>  -   **When** the user is on a specific event details view and click on the hide details button;
>  - **Then** user view should collapse and go back to previous general list of collapsed events, whether it is in initial defaut view (if user did not search for a specific city) or in a specific searched city view (if user did search for a specific city).

### User story 3 - Specify number of events

> As a **user**,   
> I should be able to **specify the number of events shown my screen**,  
> So that **I can see the number of events displayed according to my preference**.

**Scenario 3.1** - When user hasn’t specified a number, 32 events are shown by default.

> -   **Given** user hasn’t specified a specific number of events to be shown;
> -   **When** user is on initial default view (upcoming events for all cities) or has searched for a specific city;
> -   **Then** user should see 32 events shown by default.

**Scenario 3.2**- User can change the number of events displayed.

>  -   **Given** user specified a specific number of events to be shown (ex: 16);
>  -   **When** user is on initial default view (upcoming events for all cities) or has searched for a specific city;
>  - **Then** user should be able to see the specified number of events on screen (ex: 16), whether it is in initial default view (if user did not search for a specific city) or in a specific searched city view (if user did search for a specific city).

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
>  -   **When** user changes search settings (city, number of events...) while behing offline;
>  - **Then** user see an error message.

### User story 5 - Add an app shortcut to the home screen

> As a **user**,   
> I should be able to **add an app shortcut to my home screen**,  
> So that **I can access the app faster**.

**Scenario 5.1** - User can install the *Meet* app as a shortcut on their device home screen.

 >  -   **Given** user did not not have the app installed on home screen;
>  -   **When** user installs the app on device home screen;
>  - **Then** user see the app on home screen and can use it as a shortcut to access it.

### User story 6 - Display charts visualizing event details

> As a **user**,   
> I should be able to **visualize event details on charts**,  
> So that **I can know the number of upcoming events in each city**.

**Scenario 6.1** - Display charts visualizing event details

>  -   **Given** user searched for a city;
>  -   **When** user clicks on a button to show the number of upcoming events in the searched city;
>  - **Then** user can see a chart with the number of upcoming events in the searched city.


## Technical aspects

Meet app is a serverless, progressive web application (PWA) built using React (Create-React-App / CRA) and the test-driven development (TDD) technique. The application uses the Google Calendar API to fetch upcoming events in different cities.

Below is a list of all technical aspect in the project requierements, which all have me implemented and worked out:

 - (to fill in)
 - (to fill in)
 - (to fill in)
 - (to fill in)
 - (to fill in)


## App dependencies

The following dependencies are required for the *Meet* app to work:

For codes
 - All packages coming with Create-React-App
 
 For styling
 
 - (to fill in)
 
 For devDependencies
 
 - Gh-Pages

## Github repositorie and Github Pages

Here's the link to my full [Github repositorie for my *Meet* app](https://github.com/AlexaCai/meet-app).

Here's the link to my [*Meet* app hosted on Github Pages](https://alexacai.github.io/meet-app/).