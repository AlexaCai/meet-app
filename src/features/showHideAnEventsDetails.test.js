//***In addition to Gherkin files, Cucumber needs a set of step definitions. Step definitions are instructions written in JavaScript. They connect each piece of the Gherkin-based scenario to the actual code that tests each of the steps. 

//***Importing two necessary built-in functions, loadFeature() and defineFeature(), from jest-cucumber. The first one, loadFeature(), is used to load a Gherkin file, and the second, defineFeature(), is used to define the code for that file (feature).
import { loadFeature, defineFeature } from 'jest-cucumber';
import { render, within, waitFor } from '@testing-library/react';
import App from '../App';
import { getEvents } from '../api';
import userEvent from '@testing-library/user-event';


//***loadFeature() function is used to load showHideAnEventsDetails.feature Gherkin file (loadFeature() expects the file path to start from the root of the project).
const feature = loadFeature('./src/features/showHideAnEventsDetails.feature');

//***Acceptance tests for Feature 2.
//***defineFeature() function defines the feature that’s been loaded. 
defineFeature(feature, test => {

    //***Scenario 1.
    test('An event element is collapsed by default.', ({ given, when, then }) => {

        //***User first open the app, but do nothing else.
        //***AppComponent has been defined outside of the 'given' step because AppComponent will be used more than just the 'given' step (and variables defined within functions aren’t available outside those functions).
        //***Rendering the App component is equivalent to the app 'opening and being in initial default view of the app', as it’s the code that would be executed if the user were actually opening up the app.
        let AppComponent;
        given('user hasn’t clicked/expand an event element', () => {
            AppComponent = render(<App />);
        });

        //***let CitySearchDOM is necessary as in this 'when' step, we are simulating a city search by user.
        let CitySearchDOM;
        when('user is viewing upcoming events for all cities or upcoming events for a specific city', async () => {
            //***Logic to target the city search input field
            const AppDOM = AppComponent.container.firstChild;
            CitySearchDOM = AppDOM.querySelector('#city-search');
            const citySearchInput = within(CitySearchDOM).queryByRole('textbox');

            //***Logic to simulate user typing 'Berlin in city search input field.
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

        then('user should see a list of upcoming events all collapsed by default.', async () => {
            //***Query the rendered Event component.
            const eventComponents = AppComponent.container.querySelectorAll('.event');
            //***Iterate through each event component.
            eventComponents.forEach(eventComponent => {
                //***Check if the button 'Show details' is presented, meaning that the each event details arent shown (otherwise, its the 'Hide details' button that would appear).
                const showDetailsButton = within(eventComponent).queryByText('Show details');
                expect(showDetailsButton).toBeTruthy();
            });
        });
    });

    //***Scenario 2.
    test('User can expand an event to see details.', ({ given, when, and, then }) => {

        //***User first open the app, but do nothing else.
        //***AppComponent has been defined outside of the 'given' step because AppComponent will be used more than just the 'given' step (and variables defined within functions aren’t available outside those functions).
        //***Rendering the App component is equivalent to the app 'opening and being in initial default view of the app', as it’s the code that would be executed if the user were actually opening up the app.
        let AppComponent;
        given('user hasn’t clicked/expand an event element', () => {
            AppComponent = render(<App />);
        });

        //***let CitySearchDOM is necessary as in this 'when' step, we are simulating a city search by user.
        let CitySearchDOM;
        when('user is viewing upcoming events for all cities or upcoming events for a specific city', async () => {
            //***Logic to target the city search input field
            const AppDOM = AppComponent.container.firstChild;
            CitySearchDOM = AppDOM.querySelector('#city-search');
            const citySearchInput = within(CitySearchDOM).queryByRole('textbox');

            //***Logic to simulate user typing 'Berlin in city search input field.
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

        let eventComponents;
        and('user clicks on a show details button for a specific event', async () => {
            //***Simulate user clicking on 'Show details' button for the first event element rendered in the UI (eventComponents[0]...[0] being the index position).
            const user = userEvent.setup();
            eventComponents = AppComponent.container.querySelectorAll('.event');
            const showDetailsButton = within(eventComponents[0]).queryByText('Show details');
            await user.click(showDetailsButton);
        });

        then('user should see the event all details.', () => {
            //***Check that the event on which the user has clicked on 'Show details' button now display/contains the 'Hide details' button (expect(hideDetailsButton).toBeTruthy();), meaning the event details are displayed (and ready to by hiden again thanks the 'Hide details' button).
            const hideDetailsButton = within(eventComponents[0]).queryByText('Hide details');
            expect(hideDetailsButton).toBeTruthy();
        });
    });

    // //***Scenario 3.
    // test('User can collapse an event to hide details.', ({ given, when, and, then }) => {
    //     given('user has clicked/expand an event element', () => {

    //     });

    //     when('user is on a specific event details view', () => {

    //     });

    //     and('user clicks on the hide details button', () => {

    //     });

    //     then('user event view should collapse.', () => {

    //     });
    // });

});