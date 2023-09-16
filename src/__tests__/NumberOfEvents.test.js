import { render, waitFor, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import NumberOfEvents from '../components/NumberofEvents';
import App from '../App';


//***Unit testing.


describe('<NumberOfEvents /> component', () => {

    let NumberOfEventsComponent;
    beforeEach(() => {
        NumberOfEventsComponent = render(<NumberOfEvents setCurrentNOE={() => { }} setErrorAlert={() => { }} />);
    });


    test('ensure that the NumberOfEvents component contains an element with the role of the textbox (input field)', () => {
        const numberOfEventsTextBox = NumberOfEventsComponent.queryByRole('textbox');
        expect(numberOfEventsTextBox).toBeInTheDocument();
        expect(numberOfEventsTextBox).toHaveClass('numberEvents');
    });


    test('ensure that the default value of the input field is 32', () => {
        const numberOfEventsInput = NumberOfEventsComponent.getByRole('textbox');
        expect(numberOfEventsInput).toHaveValue('32');
    });


    test('ensure that the number entered by the user is displayed correctly in the input field', async () => {
        const numberOfEventsInput = NumberOfEventsComponent.getByRole('textbox');
        const user = userEvent.setup();
        user.type(numberOfEventsInput, '10');
        await waitFor(() => {
            expect(numberOfEventsInput).toHaveValue('10');
        });
    });


    test('when input value is 32 and user clicks on input field than outside input field, value remains unchanged (32)', async () => {
        const initialValue = '32';
        const numberOfEventsInput = NumberOfEventsComponent.getByRole('textbox');
        userEvent.click(numberOfEventsInput);
        userEvent.click(document.body);
        await waitFor(() => {
            expect(numberOfEventsInput.value).toBe(initialValue);
            expect(numberOfEventsInput.placeholder).toBe('');
        });
    });


    test('when input value is 32 and user clicks on input field, placeholder message appear and 32 disappears', async () => {
        const numberOfEventsInput = NumberOfEventsComponent.getByRole('textbox');
        userEvent.click(numberOfEventsInput);
        await waitFor(() => {
            expect(numberOfEventsInput.value).toBe('');
            expect(numberOfEventsInput.placeholder).toBe('Enter number of events');
        });
    });

    
    test('when input value is not 32 and user clicks on input field, value remains and placeholder message does not appear', async () => {
        const typedValue = '17';
        const numberOfEventsInput = NumberOfEventsComponent.getByRole('textbox');
        userEvent.type(numberOfEventsInput, typedValue);
        userEvent.click(document.body);
        userEvent.click(numberOfEventsInput);
        await waitFor(() => {
            expect(numberOfEventsInput.value).toBe(typedValue);
            expect(numberOfEventsInput.placeholder).toBe('');
        });
    });


    test('when input value is empty and user clicks outside, value becomes 32', async () => {
        const numberOfEventsInput = NumberOfEventsComponent.getByRole('textbox');
        userEvent.type(numberOfEventsInput, '10');
        userEvent.clear(numberOfEventsInput);
        userEvent.click(document.body);
        await waitFor(() => {
            expect(numberOfEventsInput.value).toBe('32');
            expect(numberOfEventsInput.placeholder).toBe('');
        });
    });

});


//***Integration testing.


describe('<NumberOfEvents /> integration', () => {
    
    test('ensure the number of events rendered in UI matches the number of events inputted by the user in Number of events input field', async () => {
        const user = userEvent.setup();
        const AppComponent = render(<App />);
        const AppDOM = AppComponent.container.firstChild;
        const NumberOfEventsDOM = AppDOM.querySelector('#number-events');
        const NumberOfEventsInput = within(NumberOfEventsDOM).queryByRole('textbox');
        await user.type(NumberOfEventsInput, "12");
        const EventListDOM = AppDOM.querySelector('#event-list');
        const allRenderedEventItems = within(EventListDOM).queryAllByRole('listitem');
        expect(allRenderedEventItems.length).toBe(12);
    });

});