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

    test('all events are collapsed by default', () => {
        //***Expecting that the show details button is present in the rendered component.
        expect(EventComponent.queryByText('Show details')).toBeInTheDocument();
    });

    test('event details section is shown when a user clicks on Show details button', async () => {
        const user = userEvent.setup();
        const showDetailsButton = EventComponent.queryByText('Show details');
        await user.click(showDetailsButton);
        const moreDetails = EventComponent.queryByRole('button');
        expect(moreDetails).toBeInTheDocument();
    });

    test('event details section is hidden when a user clicks on Hide details button', async () => {
        const user = userEvent.setup();
        const showDetailsButton = EventComponent.queryByText('Hide details');
        await user.click(showDetailsButton);
        const moreDetails = EventComponent.queryByRole('button');
        expect(moreDetails).toBeInTheDocument();
    });

});