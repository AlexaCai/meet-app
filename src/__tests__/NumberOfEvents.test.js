//***src/__tests__/NumberOfEvents.test.js

//***Import necessary modules and files.
import { render, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import NumberOfEvents from '../components/NumberofEvents';

describe('<NumberOfEvents /> component', () => {
    let NumberOfEventsComponent;
    beforeEach(() => {
        NumberOfEventsComponent = render(<NumberOfEvents />);
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
    
});