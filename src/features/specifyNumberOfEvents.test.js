//***In addition to Gherkin files, Cucumber needs a set of step definitions. Step definitions are instructions written in JavaScript. They connect each piece of the Gherkin-based scenario to the actual code that tests each of the steps. 

//***Importing two necessary built-in functions, loadFeature() and defineFeature(), from jest-cucumber. The first one, loadFeature(), is used to load a Gherkin file, and the second, defineFeature(), is used to define the code for that file (feature).
import { loadFeature, defineFeature } from 'jest-cucumber';
import { render, within } from '@testing-library/react';
import App from '../App';
import userEvent from '@testing-library/user-event';


//***loadFeature() function is used to load specifyNumberOfEvents.feature Gherkin file (loadFeature() expects the file path to start from the root of the project).
const feature = loadFeature('./src/features/specifyNumberOfEvents.feature');


//***Acceptance tests for Feature 3 of the app.


//***defineFeature() function defines the feature that’s been loaded.
defineFeature(feature, test => {



    //***Scenario 1 of feature 3.
    test('When user hasn’t specified a number, 32 events are shown by default', ({ given, when, then }) => {

        //***User first open the app, but do nothing else.
        //***AppComponent has been defined outside of the 'given' step because AppComponent will be used more than just the 'given' step (and variables defined within functions aren’t available outside those functions).
        //***Rendering the App component is equivalent to the app opening and being in initial default view.
        let AppComponent;
        given('user hasn’t specified a specific number of events to be shown', () => {
            AppComponent = render(<App />);
        });

        when('user is on initial default view (upcoming events for all cities) or has searched for a specific city', async () => {
            //***Logic to target the city search input field
            const AppDOM = AppComponent.container.firstChild;
            //***const CitySearchDOM is necessary in this 'when' step, since we are simulating a city search possibility by user.
            const CitySearchDOM = AppDOM.querySelector('#city-search');
            const citySearchInput = within(CitySearchDOM).queryByRole('textbox');

            //***Logic to simulate user typing 'Berlin' in city search input field.
            const user = userEvent.setup();
            await user.type(citySearchInput, "Berlin");
            const suggestionListItems = within(CitySearchDOM).queryAllByRole('listitem');
            //***In the mock data (mock-data.js) 2 suggestions are returned when the user typed in 'Berlin' ('Berlin, Germany' and 'See all cities'). As such, the requirement here is to have two suggestions when typing 'Berlin' (using the toHaveLength(2)).
            expect(suggestionListItems).toHaveLength(2);

            //***Logic to simulate user erasing previous 'Berlin' search (so city search input field is empty again).
            user.clear(citySearchInput, "");
            await user.clear(citySearchInput, "");
            const ClearedSuggestionListItems = within(CitySearchDOM).queryAllByRole('listitem');
            //***In the mock data (mock-data.js) 3 suggestions are returned when the user types nothing in the city search input field. As such, the requirement here is to have three suggestions when user types nothing (using the toHaveLength(3)).
            expect(ClearedSuggestionListItems).toHaveLength(3);
        });

        then('user should see 32 events shown by default.', () => {
            //***Target placeholder for the 'Number of events' input field.
            const numberEventsInput = AppComponent.getByPlaceholderText('Enter number of events');
            //***Look inside the placeholder to make sure his value is set up to 32.
            expect(numberEventsInput.value).toBe('32');
        });
    });



    //***Scenario 2 of feature 3.
    test('User can change the number of events displayed', ({ given, when, then }) => {

        //***Variables declared outside speciic function to be accessible by all.
        let AppComponent;
        let AppDOM;

        //***User first open the app.
        //***Rendering the App component is equivalent to the app opening and being in initial default view of the app - this is the first step ensuring the user is later able to change the number of events displayed.
        given('user specified a specific number of events to be shown (ex: 3)', async () => {
            AppComponent = render(<App />);
            AppDOM = AppComponent.container.firstChild;
            //***Logic to target the 'Number of events' input field.
            const NumberOfEventsDOM = AppDOM.querySelector('#number-events');
            const NumberofEventsInput = within(NumberOfEventsDOM).queryByRole('textbox');

            //***Logic to simulate user erasing default 32 value from 'Number of event' input field, then typing 3 in the same input field.
            const user = userEvent.setup();
            await user.clear(NumberofEventsInput);
            await user.type(NumberofEventsInput, '3');
            const placeHolderfEventsInput = AppComponent.getByPlaceholderText("");
            //***Expected value to be in the 'Number of events' input field to be 3.
            expect(placeHolderfEventsInput.value).toBe('3');
        });

        when('user is on initial default view (upcoming events for all cities) or has searched for a specific city', async () => {
            //***Logic to target the city search input field.
            AppDOM = AppComponent.container.firstChild;
            //***const CitySearchDOM is necessary in this 'when' step, since we are simulating a city search possibility by user.
            const CitySearchDOM = AppDOM.querySelector('#city-search');
            const citySearchInput = within(CitySearchDOM).queryByRole('textbox');

            //***Logic to simulate user typing 'Berlin' in city search input field.
            const user = userEvent.setup();
            await user.type(citySearchInput, "Berlin");
            const suggestionListItems = within(CitySearchDOM).queryAllByRole('listitem');
            //***In the mock data (mock-data.js) 2 suggestions are returned when the user typed in 'Berlin' ('Berlin, Germany' and 'See all cities'). As such, the requirement here is to have two suggestions when typing 'Berlin' (using the toHaveLength(2)).
            expect(suggestionListItems).toHaveLength(2);

            //***Logic to simulate user erasing previous 'Berlin' search (so city search input field is empty again).
            user.clear(citySearchInput, "");
            await user.clear(citySearchInput, "");
            const ClearedSuggestionListItems = within(CitySearchDOM).queryAllByRole('listitem');
            //***In the mock data (mock-data.js) 3 suggestions are returned when the user types nothing in the city search input field. As such, the requirement here is to have three suggestions when user types nothing (using the toHaveLength(3)).
            expect(ClearedSuggestionListItems).toHaveLength(3);
        });

        then('user should be able to see the specified number of events on screen (ex: 3).', () => {
            //***Target placeholder for the 'Number of events' input field.
            const eventComponents = AppComponent.container.querySelectorAll('.event');
            //***Expected value to be in the number of events input field to be 3.
            expect(eventComponents).toHaveLength(3);
        });
    });
});
