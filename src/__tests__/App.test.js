//***src/__tests__/App.test.js

import { render } from '@testing-library/react';
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