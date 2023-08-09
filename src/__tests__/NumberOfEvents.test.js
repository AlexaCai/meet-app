// src/__tests__/NumberOfEvents.test.js

import { render, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import NumberOfEvents from '../components/NumberofEvents';

describe('<NumberOfEvents /> component', () => {
    let NumberOfEventsComponent;
    beforeEach(() => {
        NumberOfEventsComponent = render(<NumberOfEvents />);
    });

    test('ensure that the NumberOfEvents component contains an element with the role of the textbox (input field)', () => {
        //***Look within the NumberOfEvents component to make sure it has a textbox role element somewhere (which in the case of this component, is the <input type="text"/> which corresponds to 'textbox' role).
        const numberOfEventsTextBox = NumberOfEventsComponent.queryByRole('textbox');
        expect(numberOfEventsTextBox).toBeInTheDocument();
        //***Look to make sure textbox role element somewhere (which in the case of this component, is the <input type="text"/>) has a 'numberEvents' className.
        expect(numberOfEventsTextBox).toHaveClass('numberEvents');
    });

    test('ensure that the default value of the input field is 32', () => {
        const numberOfEventsInput = NumberOfEventsComponent.getByRole('textbox'); // Use getByRole to directly target the input field
        expect(numberOfEventsInput).toHaveValue('32');
    });

    test('ensure that the number entered by the user is displayed correctly in the input field', async () => {
        const numberOfEventsInput = NumberOfEventsComponent.getByRole('textbox');
        const user = userEvent.setup();
        //***Simulate user typing '10'
        user.type(numberOfEventsInput, '10');
        //***Wait for the next render cycle before asserting the value.
        await waitFor(() => {
          expect(numberOfEventsInput).toHaveValue('10');
        });
    });
    
});