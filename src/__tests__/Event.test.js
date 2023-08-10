// src/__tests__/Event.test.js

//Import ''render'' from testing library (render is a function that's use to mock an accurate representation of the original React component, which allow for high-quality (and accurate) testing).
import { render } from '@testing-library/react';
//***Import ''userEvent'' is nececessary to make tests that involves user interactions (such as entering text in input field or clicking on a button, show as in the tests below regarding results when user click on ''Show details'' and ''Hide details'' buttons). This goes in pair with ''const user = userEvent.setup();'' used in the test (whenever a test that involves user interactions, should always start with setting up the object that will represent the user using the userEvent.setup() function).
import userEvent from '@testing-library/user-event';
//Import ''Event'' componenent from src/components folder, to allow the testing here on it (can’t test a component without importing it first in a testing file).
import Event from '../components/Event';
//***Import the mockData file containing all event objects used for testing.
import mockData from '../mock-data';

//***Using of ''describre'' function to combine multiple tests into one group (called a scope), then use the beforeEach() function only on tests within that group.
//***''describe'' function first argument '<Event /> component' is a simple description of what's being tested, while the rest is the function's logic.
describe('<Event /> component', () => {
    //***Defining a variable to store the rendered component.
    let EventComponent;
    //***''beforeEach'' is a function that runs before each test (called before each test case within a scope).
    beforeEach(() => {
        //***Renders the <Event /> component with the first event object from mockData (mock-data.js) as a prop.
        EventComponent = render(<Event event={mockData[0]} />);
    })

    //***Test looking if event's title is rendered.
    test('collapsed event has a title', () => {
        //***Expecting that the text of the event's summary is present in the rendered component.
        expect(EventComponent.queryByText(mockData[0].summary)).toBeInTheDocument();
    });

    //***Test looking if event's start time is rendered.
    test('collapsed event has a start time', () => {
        //***Expecting that the text of the event's starting time is present in the rendered component.
        expect(EventComponent.queryByText(mockData[0].created)).toBeInTheDocument();
    });

    //***Test looking if event's location is rendered.
    test('collapsed event has a location', () => {
        //***Expecting that the text of the event's location is present in the rendered component.
        expect(EventComponent.queryByText(mockData[0].location)).toBeInTheDocument();
    });

    //***Test looking if show details button is rendered when event is collapsed.
    test('collapsed event has a show details button', () => {
        //***Expecting that the show details button is present in the rendered component.
        expect(EventComponent.queryByText('Show details')).toBeInTheDocument();
    });

    //***Test looking if all events are collapsed by default.
    test('all events are collapsed by default', () => {
        //***Expecting that the show details button is present in the rendered component.
        expect(EventComponent.queryByText('Show details')).toBeInTheDocument();
    });

    //***Test looking if event details section is shown when a user clicks on Show details button.
    test('event details section is shown when a user clicks on Show details button', async () => {
        //***Setting up user interactions using the userEvent library.
        const user = userEvent.setup();
        //***Queries the EventComponent to find an element with the text content 'Show details' (when clicked, reveal more details about an event).
        const showDetailsButton = EventComponent.queryByText('Show details');
        //***Simulates a user click on the showDetailsButton (use of await indicate that this action involve asynchronous behavior).
        await user.click(showDetailsButton);
        //***Query the button element that appeared after clicking "Show details" (when a user click on Show detail button, a new view is popping, again with a button ''Hide details'' in it - thats the button targeted here).
        const moreDetails = EventComponent.queryByRole('button');
        //***Check if the button element above is in the document.
        expect(moreDetails).toBeInTheDocument();
        //***Check if the text content of the button (after clicking on the button Show details) is "Hide details".
        expect(moreDetails.textContent).toBe('Hide details');
    });

    //***Test looking if event details section is hidden when a user clicks on Hide details button.
    test('event details section is hidden when a user clicks on Hide details button', async () => {
        //***Setting up user interactions using the userEvent library.
        const user = userEvent.setup();
        //***Queries the EventComponent to find an element with the text content 'Hide details' (the button that, when clicked, hide the additional details of an event).
        const hideDetailsButton = EventComponent.queryByText('Hide details');
        //***Simulates a user click on the Hide details button.
        await user.click(hideDetailsButton);
        //***Query the button element that appeared after clicking "Hide details" (when a user click on Hide detail button, a new view is popping, again with a button ''Show details'' in it - thats the button targeted here).
        const hideDetails = EventComponent.queryByRole('button');
        //***Check if the button element above is in the document.
        expect(hideDetails).toBeInTheDocument();
        //***Check if the text content of the button (after clicking on the button Hide details) is "Show details".
        expect(hideDetails.textContent).toBe('Show details');
    });

});