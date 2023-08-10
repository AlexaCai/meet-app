//***src/__tests__/EventList.test.js

//***Import necessary modules and files.
import { render } from '@testing-library/react';
import EventList from '../components/EventList';
import { getEvents } from '../api';

describe('<EventList /> component', () => {
    let EventListComponent;
    beforeEach(() => {
        EventListComponent = render(<EventList />);
    })

    //***This test is checking if the rendered EventListComponent contains an element with a "list" role.
    test('has an element with "list" role', () => {
        expect(EventListComponent.queryByRole("list")).toBeInTheDocument();
    });

    //***This test is checking whether the EventListComponent renders the correct number of events based on the data fetched from an API.
    test('renders correct number of events', async () => {
        //***fetches all the events using the getEvents() function from API. The use of await indicates that this is an asynchronous operation.
        const allEvents = await getEvents();
        //***Re-renders the EventListComponent with the events prop allEvents. This is done to test how the component renders with a specific set of events.
        EventListComponent.rerender(<EventList events={allEvents} />);
        //***Queries the EventListComponent to find all elements with the role attribute set to "listitem" using the getAllByRole() function and then checks if the number of found elements matches the length of the allEvents array.
        expect(EventListComponent.getAllByRole("listitem")).toHaveLength(allEvents.length);
    });

});