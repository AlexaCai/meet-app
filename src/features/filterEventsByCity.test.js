//***In addition to Gherkin files, Cucumber needs a set of step definitions. Step definitions are instructions written in JavaScript. They connect each piece of the Gherkin-based scenario to the actual code that tests each of the steps. 


import { loadFeature, defineFeature } from 'jest-cucumber';
import { render, within, waitFor } from '@testing-library/react';
import App from '../App';
import { getEvents } from '../api';
import userEvent from '@testing-library/user-event';


const feature = loadFeature('./src/features/filterEventsByCity.feature');


//***Acceptance tests for Feature 1.


defineFeature(feature, test => {


    //***Scenario 1 of feature 1.
    test('When user hasn’t searched for a specific city, show upcoming events from all cities', ({ given, when, then }) => {


        given('user hasn’t searched for any city', () => {
        });


        let AppComponent;
        when('user is in the initial default view of the app', () => {
            AppComponent = render(<App />);
        });

        
        then('user should see a list of upcoming events for all cities.', async () => {
            const AppDOM = AppComponent.container.firstChild;
            const EventListDOM = AppDOM.querySelector('#event-list');
            //***Getting the list of events is an asynchronous action. Use await waitFor() when querying the events list items because we want to give the app time enough to asynchronously fetch events and then update the DOM accordingly. 
            await waitFor(() => {
                const EventListItems = within(EventListDOM).queryAllByRole('listitem');
                expect(EventListItems.length).toBe(32);
            });
        });
    });


    //***Scenario 2 of feature 1.
    test('User should see a list of suggestions when they search for a city', ({ given, when, then }) => {


        let AppComponent;
        given('user is in the initial default view of the app', () => {
            AppComponent = render(<App />);
        });


        let CitySearchDOM;
        when('user starts typing in the city search input field', async () => {
            const user = userEvent.setup();
            const AppDOM = AppComponent.container.firstChild;
            CitySearchDOM = AppDOM.querySelector('#city-search');
            const citySearchInput = within(CitySearchDOM).queryByRole('textbox');
            await user.type(citySearchInput, "Berlin");
        });


        then('user should receive a list of cities (suggestions) that match what is typed.', async () => {
            const suggestionListItems = within(CitySearchDOM).queryAllByRole('listitem');
            //***In the mock data (mock-data.js) 2 suggestions are returned when the user typed in 'Berlin' ('Berlin, Germany' and 'See all cities'). As such, the requirement here is to have two suggestions when typing 'Berlin' (using the toHaveLength(2)).
            expect(suggestionListItems).toHaveLength(2);
        });
    });


    //***Scenario 3 of feature 1.
    test('User can select a city from the suggested list', ({ given, and, when, then }) => {


        let AppComponent;
        let AppDOM;
        let CitySearchDOM;
        let citySearchInput;


        given('user typed a specific city (ex: Berlin) in the city search input field', async () => {
            AppComponent = render(<App />);
            const user = userEvent.setup();
            AppDOM = AppComponent.container.firstChild;
            CitySearchDOM = AppDOM.querySelector('#city-search');
            citySearchInput = within(CitySearchDOM).queryByRole('textbox');
            await user.type(citySearchInput, "Berlin");
        });


        let suggestionListItems;
        and('the list of suggested cities is showing', () => {
            suggestionListItems = within(CitySearchDOM).queryAllByRole('listitem');
            //***Two suggestions are supposed to be displayed in App’s list of suggestions after user typed 'Berlin', because the searched city (Berlin) is supposed to appear, along with the 'See all cities' option.
            expect(suggestionListItems).toHaveLength(2);
        });


        when('user selects a city (ex: Berlin, Germany) from the suggestion list', async () => {
            const user = userEvent.setup();
            await user.click(suggestionListItems[0]);
        });


        then('user interface should be changed to that city (ex: Berlin, Germany)', () => {
            expect(citySearchInput.value).toBe('Berlin, Germany');
        });
        

        and('user should receive a list of upcoming events in that city.', async () => {
            const EventListDOM = AppDOM.querySelector('#event-list');
            const EventListItems = within(EventListDOM).queryAllByRole('listitem');
            const allEvents = await getEvents();
            const berlinEvents = allEvents.filter(event => event.location === citySearchInput.value)

            
            await waitFor(() => {
                const EventListDOM = AppDOM.querySelector('#event-list');
                const filteredCity = within(EventListDOM).queryAllByRole('listitem');
                expect(filteredCity.length).toBe(EventListItems.length);
                filteredCity.forEach(event => {
                    expect(event.textContent).toContain("Berlin, Germany");
                });
            });
        });
    });
});