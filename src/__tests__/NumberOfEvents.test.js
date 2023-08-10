//***src/__tests__/NumberOfEvents.test.js

//***Import necessary modules and files.
import { render, waitFor, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import NumberOfEvents from '../components/NumberofEvents';
//***Import the App.js component.
import App from '../App';

describe('<NumberOfEvents /> component', () => {
    let NumberOfEventsComponent;
    beforeEach(() => {
        NumberOfEventsComponent = render(<NumberOfEvents setCurrentNOE={() => {}}/>);
    });

    //***This test checks whether the rendered NumberOfEventsComponent contains an element with a role of "textbox" (input field).
    test('ensure that the NumberOfEvents component contains an element with the role of the textbox (input field)', () => {
        //***Look within the NumberOfEvents component to make sure it has a textbox role element somewhere (which in the case of this component, is the <input type="text"/> which corresponds to 'textbox' role).
        const numberOfEventsTextBox = NumberOfEventsComponent.queryByRole('textbox');
        expect(numberOfEventsTextBox).toBeInTheDocument();
        //***Look to make sure textbox role element somewhere (which in the case of this component, is the <input type="text"/>) has a 'numberEvents' className.
        expect(numberOfEventsTextBox).toHaveClass('numberEvents');
    });

    //***This test checks if the default value of the input field in the NumberOfEventsComponent is '32'.
    test('ensure that the default value of the input field is 32', () => {
        //***Queries the NumberOfEventsComponent to find the input field element using the role attribute set to "textbox" and then look if it has the number 32 in it by default.
        const numberOfEventsInput = NumberOfEventsComponent.getByRole('textbox');
        expect(numberOfEventsInput).toHaveValue('32');
    });

    //***This test checks if the number entered by the user is correctly displayed in the input field.
    test('ensure that the number entered by the user is displayed correctly in the input field', async () => {
        //***Target the textbox in which user can enter a number.
        const numberOfEventsInput = NumberOfEventsComponent.getByRole('textbox');
        //***Setting up user interactions using the userEvent library.
        const user = userEvent.setup();
        //***Simulate user typing '10'.
        user.type(numberOfEventsInput, '10');
        //***Wait for the next render cycle before asserting the value.
        await waitFor(() => {
            expect(numberOfEventsInput).toHaveValue('10');
        });
    });

    //***This test checks that when input value is 32 (default value if not user action) and user clicks outside input field, value remains unchanged (stays at 32).
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

    //***This test checks that the 32 default input number is changed to the placeholder message when user clicks on the input field.
    test('when input value is 32 and user clicks on input field, placeholder message appear and 32 disappears', async () => {
        const numberOfEventsInput = NumberOfEventsComponent.getByRole('textbox');
        userEvent.click(numberOfEventsInput);
        await waitFor(() => {
            //***Check if the input value changes (disappears).
            expect(numberOfEventsInput.value).toBe('');
            //***Check if the placeholder message appears.
            expect(numberOfEventsInput.placeholder).toBe('Enter number of events');
        });
    });

    //***This test checks that when input value is not 32 (after user changed it from initial 32 number), and user clicks out/on input field, previous value typed remains and placeholder message does not appear.
    test('when input value is not 32 and user clicks on input field, value remains and placeholder message does not appear', async () => {
        //***Set random number a user could type in the input field (this could be any number).
        const typedValue = '17';
        const numberOfEventsInput = NumberOfEventsComponent.getByRole('textbox');
        //***User type the value (ex: 17)
        userEvent.type(numberOfEventsInput, typedValue);
        //***Click outside the input field.
        userEvent.click(document.body);
        //***Click back on the input field.
        userEvent.click(numberOfEventsInput);
        await waitFor(() => {
            //***Check if the input value remains unchanged
            expect(numberOfEventsInput.value).toBe(typedValue);
            //***Check if the placeholder message is still empty
            expect(numberOfEventsInput.placeholder).toBe('');
        });
    });

    //***This test checks that when input value is empty and user clicks outside input field, value becomes 32 (default value).
    test('when input value is empty and user clicks outside, value becomes 32', async () => {
        const numberOfEventsInput = NumberOfEventsComponent.getByRole('textbox');
        //***Simulate user typing a random value and then clearing the input.
        userEvent.type(numberOfEventsInput, '10');
        userEvent.clear(numberOfEventsInput);
        //***Simulate clicking outside the input field (after having writting something it it, than delete it).
        userEvent.click(document.body);
        await waitFor(() => {
            expect(numberOfEventsInput.value).toBe('32');
            expect(numberOfEventsInput.placeholder).toBe('');
        });
    });

});

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