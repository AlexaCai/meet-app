//***In addition to Gherkin files, Cucumber needs a set of step definitions. Step definitions are instructions written in JavaScript. They connect each piece of the Gherkin-based scenario to the actual code that tests each of the steps. 


import { loadFeature, defineFeature } from 'jest-cucumber';
import { render, within, waitFor } from '@testing-library/react';
import App from '../App';
import userEvent from '@testing-library/user-event';


const feature = loadFeature('./src/features/showHideAnEventsDetails.feature');


//***Acceptance tests for Feature 2 of the app.


defineFeature(feature, test => {


    //***Scenario 1 of feature 2.
    test('An event element is collapsed by default', ({ given, when, then }) => {


        let AppComponent;
        given('user hasn’t clicked/expand an event element', () => {
            AppComponent = render(<App />);
        });


        when('user is viewing upcoming events for all cities or upcoming events for a specific city', async () => {
            const AppDOM = AppComponent.container.firstChild;
            const CitySearchDOM = AppDOM.querySelector('#city-search');
            const citySearchInput = within(CitySearchDOM).queryByRole('textbox');

            const user = userEvent.setup();
            await user.type(citySearchInput, "Berlin");
            const suggestionListItems = within(CitySearchDOM).queryAllByRole('listitem');
            //***In the mock data (mock-data.js) 2 suggestions are returned when the user typed in 'Berlin' ('Berlin, Germany' and 'See all cities'). As such, the requirement here is to have two suggestions when typing 'Berlin' (using the toHaveLength(2)).
            expect(suggestionListItems).toHaveLength(2);

            user.clear(citySearchInput, "");
            await user.clear(citySearchInput, "");
            const ClearedSuggestionListItems = within(CitySearchDOM).queryAllByRole('listitem');
            //***In the mock data (mock-data.js) 3 suggestions are returned when the user types nothing in the city search input field. As such, the requirement here is to have three suggestions when user types nothing (using the toHaveLength(3)).
            expect(ClearedSuggestionListItems).toHaveLength(3);
        });


        then('user should see a list of upcoming events all collapsed by default.', async () => {
            const eventComponents = AppComponent.container.querySelectorAll('.event');
            eventComponents.forEach(eventComponent => {
                const showDetailsButton = within(eventComponent).queryByText('Show details');
                expect(showDetailsButton).toBeTruthy();
            });
        });
    });



    //***Scenario 2 of feature 2.
    test('User can expand an event to see details', ({ given, when, and, then }) => {


        let AppComponent;
        given('user hasn’t clicked/expand an event element', () => {
            AppComponent = render(<App />);
        });


        when('user is viewing upcoming events for all cities or upcoming events for a specific city', async () => {
            const AppDOM = AppComponent.container.firstChild;
            const CitySearchDOM = AppDOM.querySelector('#city-search');
            const citySearchInput = within(CitySearchDOM).queryByRole('textbox');

            const user = userEvent.setup();
            await user.type(citySearchInput, "Berlin");
            const suggestionListItems = within(CitySearchDOM).queryAllByRole('listitem');
            //***In the mock data (mock-data.js) 2 suggestions are returned when the user typed in 'Berlin' ('Berlin, Germany' and 'See all cities'). As such, the requirement here is to have two suggestions when typing 'Berlin' (using the toHaveLength(2)).
            expect(suggestionListItems).toHaveLength(2);

            user.clear(citySearchInput, "");
            await user.clear(citySearchInput, "");
            const ClearedSuggestionListItems = within(CitySearchDOM).queryAllByRole('listitem');
            //***In the mock data (mock-data.js) 3 suggestions are returned when the user types nothing in the city search input field. As such, the requirement here is to have three suggestions when user types nothing (using the toHaveLength(3)).
            expect(ClearedSuggestionListItems).toHaveLength(3);
        });


        let eventComponents;
        and('user clicks on a show details button for a specific event', async () => {
            const user = userEvent.setup();
            eventComponents = AppComponent.container.querySelectorAll('.event');
            //***Simulate user clicking on 'Show details' button on the first event of the list eventComponents[0]...[0] being first index position.
            const showDetailsButton = within(eventComponents[0]).queryByText('Show details');
            await user.click(showDetailsButton);
        });
        

        then('user should see the event all details.', () => {
            const hideDetailsButton = within(eventComponents[0]).queryByText('Hide details');
            expect(hideDetailsButton).toBeTruthy();
        });
    });


    //***Scenario 3 of feature 2.
    test('User can collapse an event to hide details', ({ given, when, then }) => {


        let eventComponents;
        let AppComponent;
        let showDetailsButton;


        given('user has clicked/expand an event element', async () => {
            AppComponent = render(<App />);
            //***waitFor function is used to make sure that the AppComponent (main view) is properly rendered and available before proceeding to interact with it. 
            await waitFor(() => {
                eventComponents = AppComponent.container.querySelectorAll('.event');
                showDetailsButton = within(eventComponents[0]).queryByText('Show details');
            });
            const user = userEvent.setup();
            await user.click(showDetailsButton);
            const hideDetailsButton = within(eventComponents[0]).queryByText('Hide details');
            expect(hideDetailsButton).toBeTruthy();
        });


        when('user clicks on the hide details button', async () => {
            const user = userEvent.setup();
            const hideDetailsButton = within(eventComponents[0]).queryByText('Hide details');
            await user.click(hideDetailsButton);
        });


        then('user event view should collapse.', async () => {
            showDetailsButton = within(eventComponents[0]).queryByText('Show details');
            expect(showDetailsButton).toBeTruthy();
        });
    });
});