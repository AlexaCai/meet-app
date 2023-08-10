//***src/__tests__/App.test.js

import { render, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { getEvents } from '../api';
import App from '../App';

//***''describe'' is a function provided by Jest. The test suite is named "<App /> component". The following test suite (containning 3 different tests) is a way to group related tests together for a specific component or functionality.
describe('<App /> component', () => {
    //***Variable ''AppDOM'' is used to store the rendered DOM of the <App /> component. The rendered DOM allows to interact with and query the component's structure and elements.
    let AppDOM;
    //***The ''beforeEach'' function sets up a piece of code to run before each test in the suite. In this case, it's rendering the <App /> component using the render function from React Testing Library and storing the rendered DOM's first child (the root element of the component) in the AppDOM variable.
    beforeEach(() => {
      AppDOM = render(<App />).container.firstChild;
    })
  
    //***First test within the suite. It uses the test function from Jest to define a test case. The test checks if an element with the ID ''event-list'' exists within the AppDOM. The toBeInTheDocument() matcher from React Testing Library's ''expect'' is used to determine whether the element is present in the DOM.
    test('renders list of events', () => {
      expect(AppDOM.querySelector('#event-list')).toBeInTheDocument();
    });
  
    //***Second test, same principle as the first.
    test('render CitySearch', () => {
      expect(AppDOM.querySelector('#city-search')).toBeInTheDocument();
    });

    //***Third test, same principle as the first.
    test('render NumberOfEvents', () => {
        expect(AppDOM.querySelector('#number-events')).toBeInTheDocument();
      });

  });

  describe('<App /> integration', () => {

    //***This test ensures that the number of rendered events in the UI equals the number of events located in “Berlin, Germany”.
    test('renders a list of events matching the city selected by the user', async () => {

        //***userEvent is set, and the App component and its DOM are mocked.
        const user = userEvent.setup();
        const AppComponent = render(<App />);
        const AppDOM = AppComponent.container.firstChild;
    
        //***A reference to the CitySearch component root DOM node is initialized, then a query is performed to find the city input text box in it.
        const CitySearchDOM = AppDOM.querySelector('#city-search');
        const CitySearchInput = within(CitySearchDOM).queryByRole('textbox');
   
        //***Simulates typing “Berlin” in the city textbox and then clicking on the list item that contains 'Berlin, Germany'.
        await user.type(CitySearchInput, "Berlin");
        const berlinSuggestionItem = within(CitySearchDOM).queryByText('Berlin, Germany');
        await user.click(berlinSuggestionItem);
    
        //***This code queries #event-list (the EventList component root node DOM), and finds what Event list item is rendered inside it. Essential to do this query after clicking on a suggestion list because we expect that the EventList will be affected after selecting that suggestion list item.
        const EventListDOM = AppDOM.querySelector('#event-list');
        const allRenderedEventItems = within(EventListDOM).queryAllByRole('listitem');   
    
        //***Gets a list of all events from the mock data that are located in 'Berlin, Germany'
        const allEvents = await getEvents();
        const berlinEvents = allEvents.filter(
          event => event.location === 'Berlin, Germany'
        );
    
        //***Comparing the number of events located in "Berlin, Germany" with the array of rendered Event list items, expecting them to have the same length.
        expect(allRenderedEventItems.length).toBe(berlinEvents.length);

        //***Make sure that all of the items contain the text 'Berlin, Germany'.
        allRenderedEventItems.forEach(event => {
            expect(event.textContent).toContain("Berlin, Germany");
          });
      });
});