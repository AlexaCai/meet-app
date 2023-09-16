//***In addition to Gherkin files, Cucumber needs a set of step definitions. Step definitions are instructions written in JavaScript. They connect each piece of the Gherkin-based scenario to the actual code that tests each of the steps. 


import { loadFeature, defineFeature } from 'jest-cucumber';
import { render, within } from '@testing-library/react';
import App from '../App';
import userEvent from '@testing-library/user-event';


const feature = loadFeature('./src/features/specifyNumberOfEvents.feature');


//***Acceptance tests for Feature 3 of the app.


defineFeature(feature, test => {


    //***Scenario 1 of feature 3.
    test('When user hasn’t specified a number, 32 events are shown by default', ({ given, when, then }) => {


        let AppComponent;
        given('user hasn’t specified a specific number of events to be shown', () => {
            AppComponent = render(<App />);
        });


        when('user is on initial default view (upcoming events for all cities) or has searched for a specific city', async () => {
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
        

        then('user should see 32 events shown by default.', () => {
            const numberEventsInput = AppComponent.getByPlaceholderText('Enter number of events');
            expect(numberEventsInput.value).toBe('32');
        });
    });


    //***Scenario 2 of feature 3.
    test('User can change the number of events displayed', ({ given, when, then }) => {


        let AppComponent;
        let AppDOM;


        given('user specified a specific number of events to be shown (ex: 3)', async () => {
            AppComponent = render(<App />);
            AppDOM = AppComponent.container.firstChild;
            const NumberOfEventsDOM = AppDOM.querySelector('#number-events');
            const NumberofEventsInput = within(NumberOfEventsDOM).queryByRole('textbox');

            const user = userEvent.setup();
            await user.clear(NumberofEventsInput);
            await user.type(NumberofEventsInput, '3');
            const placeHolderfEventsInput = AppComponent.getByPlaceholderText("");
            expect(placeHolderfEventsInput.value).toBe('3');
        });


        when('user is on initial default view (upcoming events for all cities) or has searched for a specific city', async () => {
            AppDOM = AppComponent.container.firstChild;
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


        then('user should be able to see the specified number of events on screen (ex: 3).', () => {
            const eventComponents = AppComponent.container.querySelectorAll('.event');
            expect(eventComponents).toHaveLength(3);
        });
    });
});
