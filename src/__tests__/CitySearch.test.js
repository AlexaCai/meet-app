//***src/__tests__/CitySearch.test.js

//***Import ''render'' for rendering components
import { render, within } from '@testing-library/react';
//***Important ''useEvent'' for simulating user interactions in some test below.
import userEvent from '@testing-library/user-event';
//***Import CitySearch (which is necessary because its the component being tested in this file). 
import CitySearch from '../components/CitySearch';
//***Import the App.js component.
import App from '../App';
//***Import two functions use for fetching and processing event data.
import { extractLocations, getEvents } from '../api';

//***Unit testing.
//***''describe'' is a function provided by Jest. The test suite is named "<CitySearch />". The following test suite (containning 5 different tests) is a way to group related tests together for a specific component or functionality.
describe('<CitySearch /> component', () => {
    //***Declares a variable ''CitySearchComponent'' and sets up a beforeEach code, which runs before each test in the suite. It renders the CitySearch component using the render function and stores the result in CitySearchComponent.
    let CitySearchComponent;
    beforeEach(() => {
        CitySearchComponent = render(<CitySearch
            allLocations={[]}
            setCurrentCity={() => { }}
            setInfoAlert={() => { }}
        />);
    });

    //***First test case checks whether the rendered CitySearch component contains a text input element. It uses queryByRole to find an element with the role of 'textbox'. It then uses the toBeInTheDocument() matcher to check if the element is present in the DOM and the toHaveClass('city') matcher to check if the element has a class of 'city'.
    test('renders text input', () => {
        const cityTextBox = CitySearchComponent.queryByRole('textbox');
        expect(cityTextBox).toBeInTheDocument();
        expect(cityTextBox).toHaveClass('city');
    });

    //***Second test that checks whether the suggestions list (a list of location suggestions) is hidden by default. It uses queryByRole to find an element with the role of 'list' and uses the not.toBeInTheDocument() matcher to check if the element is not present in the DOM.
    test('suggestions list is hidden by default', () => {
        const suggestionList = CitySearchComponent.queryByRole('list');
        expect(suggestionList).not.toBeInTheDocument();
    });

    //***This test case simulates the behavior of clicking on the city textbox to check if the suggestions list appears. It sets up the ''userEvent'' simulation and simulates a click on the city textbox by a user. Then it checks if the suggestion list element is present and has the class 'suggestions'.
    test('renders a list of suggestions when city textbox gains focus', async () => {
        const user = userEvent.setup();
        const cityTextBox = CitySearchComponent.queryByRole('textbox');
        await user.click(cityTextBox);
        const suggestionList = CitySearchComponent.queryByRole('list');
        expect(suggestionList).toBeInTheDocument();
        expect(suggestionList).toHaveClass('suggestions');
    });

    //***This test checks if the list of suggestions updates correctly as the user types into the city textbox. 
    test('updates list of suggestions correctly when user types in city textbox', async () => {
        //***Setting up user interactions using the userEvent library.
        const user = userEvent.setup();
        //***allEvents contains the list of all events by calling the asynchronous function, getEvents.
        const allEvents = await getEvents();
        //***allLocations contains the set of all possible distinct locations that will be extracted from allEvents. This extraction is done by using the function extractLocations.
        const allLocations = extractLocations(allEvents);
        //***CitySearch mock component is re-rendered as a way to overwrite the original CitySearchComponent (see beforeAll above), but this time it has a new prop (allLocations) passed to it.
        CitySearchComponent.rerender(<CitySearch
            allLocations={allLocations}
            setCurrentCity={() => { }}
            setInfoAlert={() => { }}
        />);
        //***The process of a user typing “Berlin” in the city input field is simulated.
        const cityTextBox = CitySearchComponent.queryByRole('textbox');
        await user.type(cityTextBox, "Berlin");
        //***allLocations is filtered down to the suggestions array — the array that will only contain locations matching the query typed by the user in the city input field.
        const suggestions = allLocations ? allLocations.filter((location) => {
            return location.toUpperCase().indexOf(cityTextBox.value.toUpperCase()) > -1;
        }) : [];
        //***get all <li> elements inside the suggestion list.
        //***The number of rendered suggestions is compared to the number of suggestions in the ''state'' of CitySearch, plus one. This is because we manually add a “See all cities” suggestion at the end of the list (this means the minimum length of the <li>s will be 1).
        const suggestionListItems = CitySearchComponent.queryAllByRole('listitem');
        expect(suggestionListItems).toHaveLength(suggestions.length + 1);
        //***The rendered text in each list item is checked (using a for loop) to ensure that it matches the corresponding value on the suggestions array.
        for (let i = 0; i < suggestions.length; i += 1) {
            expect(suggestionListItems[i].textContent).toBe(suggestions[i]);
        }
    });

    //***This test case simulates the behavior of clicking on a suggestion from the suggestions list and checks if the clicked suggestion's text appears in the city textbox.
    test('renders the suggestion text in the textbox upon clicking on the suggestion', async () => {
        //***Setting up user interactions using the userEvent library.
        const user = userEvent.setup();
        //***Fetching a list of all events from an API.js.
        const allEvents = await getEvents();
        //***Extracting location information from the list of events using extractLocations function from Api.js (imported in this document as a props, like getEvents).
        const allLocations = extractLocations(allEvents);
        //***Rerendering the CitySearchComponent with the list of locations.
        CitySearchComponent.rerender(<CitySearch
            allLocations={allLocations}
            setCurrentCity={() => { }}
            setInfoAlert={() => { }}
        />);
        //***Querying for the city textbox element using its role attribute (input = textbox).
        const cityTextBox = CitySearchComponent.queryByRole('textbox');
        //***Simulating user typing 'Berlin' into the city textbox.
        await user.type(cityTextBox, "Berlin");
        //***Querying for the first suggestion/list item in the suggestions list.
        const BerlinGermanySuggestion = CitySearchComponent.queryAllByRole('listitem')[0];
        //***Simulating user clicking on the first suggestion item (Berlin).
        await user.click(BerlinGermanySuggestion);
        //***Checking if the city textbox now has the same value as the clicked suggestion's city.
        expect(cityTextBox).toHaveValue(BerlinGermanySuggestion.textContent);
    });

});

//***Integration testing.
describe('<CitySearch /> integration', () => {

    //***This test assumes everything work once the App component is rendered (from the user’s point of view, when the app is opened) and the user clicks on the city text box. The correct suggestions list will appear (the expected number should be the count of all suggested locations, plus one for the hardcoded 'See all cities' suggested item). 
    test('renders suggestions list when the app is rendered.', async () => {
        const user = userEvent.setup();
        const AppComponent = render(<App />);
        const AppDOM = AppComponent.container.firstChild;

        const CitySearchDOM = AppDOM.querySelector('#city-search');
        const cityTextBox = within(CitySearchDOM).queryByRole('textbox');
        await user.click(cityTextBox);

        const allEvents = await getEvents();
        const allLocations = extractLocations(allEvents);

        const suggestionListItems = within(CitySearchDOM).queryAllByRole('listitem');
        expect(suggestionListItems.length).toBe(allLocations.length + 1);
    });
});