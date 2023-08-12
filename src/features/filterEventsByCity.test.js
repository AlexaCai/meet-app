//***In addition to Gherkin files, Cucumber needs a set of step definitions. Step definitions are instructions written in JavaScript. They connect each piece of the Gherkin-based scenario to the actual code that tests each of the steps. 

//***Importing two necessary built-in functions, loadFeature() and defineFeature(), from jest-cucumber. The first one, loadFeature(), is used to load a Gherkin file, and the second, defineFeature(), is used to define the code for that file (feature).
import { loadFeature, defineFeature } from 'jest-cucumber';
import { render, within, waitFor } from '@testing-library/react';
import App from '../App';
import { getEvents } from '../api';
import userEvent from '@testing-library/user-event';


//***loadFeature() function is used to load filterEventsByCity.feature Gherkin file (loadFeature() expects the file path to start from the root of the project).
const feature = loadFeature('./src/features/filterEventsByCity.feature');


//***Acceptance tests for Feature 1.


//***defineFeature() function defines the feature that’s been loaded. 
defineFeature(feature, test => {



    //***Scenario 1 of feature 1.
    test('When user hasn’t searched for a specific city, show upcoming events from all cities', ({ given, when, then }) => {

        //***In the 'given' step, the precondition is 'user hasn’t searched for any city.' This doesn't require any code as nothing has happened yet (the user hasn’t searched for anything).
        given('user hasn’t searched for any city', () => {
        });

        //***AppComponent has been defined outside of the 'when' step because AppComponent will be used more than just the 'when' step (and variables defined within functions aren’t available outside those functions).
        //***Rendering the App component is equivalent to the app opening and being in initial default view.
        let AppComponent;
        when('user is in the initial default view of the app', () => {
            AppComponent = render(<App />);
        });

        then('user should see a list of upcoming events for all cities.', async () => {
            const AppDOM = AppComponent.container.firstChild;
            const EventListDOM = AppDOM.querySelector('#event-list');
            //***Getting the list of events is an asynchronous action. Use await waitFor() when querying the events list items because we want to give the app time enough to asynchronously fetch events and then update the DOM accordingly. 
            await waitFor(() => {
                //***Select all list items rendered in UI.
                const EventListItems = within(EventListDOM).queryAllByRole('listitem');
                //***Except all list items to of 32.
                expect(EventListItems.length).toBe(32);
            });
        });
    });



    //***Scenario 2 of feature 1.
    test('User should see a list of suggestions when they search for a city', ({ given, when, then }) => {

        //***User first open the app, but do nothing else.
        //***AppComponent has been defined outside of the 'given' step because AppComponent will be used more than just the 'given' step (and variables defined within functions aren’t available outside those functions).
        //***Rendering the App component is equivalent to the app opening and being in initial default view.
        let AppComponent;
        given('user is in the initial default view of the app', () => {
            AppComponent = render(<App />);
        });

        //***CitySearchDOM is outside the 'when' step because it'll be needed it in the next step (then).
        let CitySearchDOM;
        when('user starts typing in the city search input field', async () => {
            const user = userEvent.setup();
            const AppDOM = AppComponent.container.firstChild;
            CitySearchDOM = AppDOM.querySelector('#city-search');
            //***Simulate the user clicking on the city search input field and typing "Berlin" into it.
            const citySearchInput = within(CitySearchDOM).queryByRole('textbox');
            await user.type(citySearchInput, "Berlin");
        });

        //***In the 'then' step comes the expected outcome, which is that the users should receive a list of cities (suggestions) that match what they’ve typed in the city search input field.
        then('user should receive a list of cities (suggestions) that match what is typed.', async () => {
            const suggestionListItems = within(CitySearchDOM).queryAllByRole('listitem');
            //***In the mock data (mock-data.js) 2 suggestions are returned when the user typed in 'Berlin' ('Berlin, Germany' and 'See all cities'). As such, the requirement here is to have two suggestions when typing 'Berlin' (using the toHaveLength(2)).
            expect(suggestionListItems).toHaveLength(2);
        });
    });



    //***Scenario 3 of feature 1.
    test('User can select a city from the suggested list', ({ given, and, when, then }) => {

        //***All four variables are declared/defined outside of the given() function, because we'll need to use them in later steps in this test, and therefore by being declared outside, we won't have to keep redeclaring them when we want to use them.
        let AppComponent;
        let AppDOM;
        let CitySearchDOM;
        let citySearchInput;

        //***User first open the app, but do nothing else.
        //***Rendering the App component is equivalent to the app opening and being in initial default view.
        //***The 'given' function is async to allow the test to properly simulate any user actions.
        given('user typed a specific city (ex: Berlin) in the city search input field', async () => {
            //***App component is rendered using the render() function.
            AppComponent = render(<App />);
            const user = userEvent.setup();
            AppDOM = AppComponent.container.firstChild;
            CitySearchDOM = AppDOM.querySelector('#city-search');
            //***Simulate the user clicking on the city search input field and typing 'Berlin' into it.
            citySearchInput = within(CitySearchDOM).queryByRole('textbox');
            await user.type(citySearchInput, "Berlin");
        });

        //***suggestionListItems is defined outside and() to be able use it in the next when() step.
        let suggestionListItems;
        and('the list of suggested cities is showing', () => {
            //***Check whether two suggestions are being displayed in App’s list of suggestions after user typed 'Berlin' (toHaveLength(2)).
            suggestionListItems = within(CitySearchDOM).queryAllByRole('listitem');
            expect(suggestionListItems).toHaveLength(2);
        });

        //***In this 'when' step, we define an action that represents the user selecting a city from the list of suggestions.
        when('user selects a city (ex: Berlin, Germany) from the suggestion list', async () => {
            //***Simulating user clicking on the first suggestion, which in this case, is 'Berlin, Germany' (the second one would be 'See all cities', which is defined in CitySearch component). The 'async' keyword has been added before the callback function passed to when() because it is necessary to simulate user actions inside it.
            const user = userEvent.setup();
            await user.click(suggestionListItems[0]);
        });

        //***Since we know that 'that city' is referring to 'Berlin, Germany', it means we have to write an expect() function that checks whether the query state of CitySearch is 'Berlin, Germany'.
        then('user interface should be changed to that city (ex: Berlin, Germany)', () => {
            expect(citySearchInput.value).toBe('Berlin, Germany');
        });

        //***The 'async' keyword is added before the callback function passed to when(), because we're calling the asynchronous function getEvents() inside it.
        and('user should receive a list of upcoming events in that city.', async () => {
            const EventListDOM = AppDOM.querySelector('#event-list');
            const EventListItems = within(EventListDOM).queryAllByRole('listitem');
            const allEvents = await getEvents();
            //***Filtering the list of all events down to events located in 'Berlin'.
            //***CitySearchInput.value should have the value 'Berlin, Germany' at this point
            const berlinEvents = allEvents.filter(event => event.location === citySearchInput.value)
            //***The expect() function checks whether the number of events rendered in the App component equals the length of the array of events located in 'Berlin, Germany' in src/mock-data.js file when the tests are runned.
            expect(EventListItems).toHaveLength(berlinEvents.length);
        });
    });
});