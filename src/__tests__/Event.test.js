import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Event, { formatDate } from '../components/Event';
import mockData from '../mock-data';


//***Unit testing.


describe('<Event /> component', () => {
    
    let EventComponent;
    beforeEach(() => {
        EventComponent = render(<Event event={mockData[0]} />);
    })


    test('collapsed event has a title', () => {
        expect(EventComponent.queryByText(mockData[0].summary)).toBeInTheDocument();
    });


    test('collapsed event has a start time', () => {
        const formattedCreated = formatDate(mockData[0].created);
        expect(EventComponent.queryByText(formattedCreated)).toBeInTheDocument();
    });


    test('collapsed event has a location', () => {
        expect(EventComponent.queryByText(mockData[0].location)).toBeInTheDocument();
    });


    test('collapsed event has a show details button', () => {
        expect(EventComponent.queryByText('Show details')).toBeInTheDocument();
    });

    
    test('all events are collapsed by default', () => {
        expect(EventComponent.queryByText('Show details')).toBeInTheDocument();
    });


    test('event details section is shown when a user clicks on Show details button', async () => {
        const user = userEvent.setup();
        const showDetailsButton = EventComponent.queryByText('Show details');
        await user.click(showDetailsButton);
        const moreDetails = EventComponent.queryByRole('button');
        expect(moreDetails).toBeInTheDocument();
        expect(moreDetails.textContent).toBe('Hide details');
    });


    test('event details section is hidden when a user clicks on Hide details button', async () => {
        const user = userEvent.setup();
        const hideDetailsButton = EventComponent.queryByText('Hide details');
        await user.click(hideDetailsButton);
        const hideDetails = EventComponent.queryByRole('button');
        expect(hideDetails).toBeInTheDocument();
        expect(hideDetails.textContent).toBe('Show details');
    });

});