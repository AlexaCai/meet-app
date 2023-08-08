// src/__tests__/CitySearch.test.js

import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import CitySearch from '../components/CitySearch';
import { extractLocations, getEvents } from '../api';

describe('<CitySearch /> component', () => {
  let CitySearchComponent;
  beforeEach(() => {
    CitySearchComponent = render(<CitySearch />);
  });
  test('renders text input', () => {
    const cityTextBox = CitySearchComponent.queryByRole('textbox');
    expect(cityTextBox).toBeInTheDocument();
    expect(cityTextBox).toHaveClass('city');
  });

  test('suggestions list is hidden by default', () => {
    const suggestionList = CitySearchComponent.queryByRole('list');
    expect(suggestionList).not.toBeInTheDocument();
  });

  test('renders a list of suggestions when city textbox gains focus', async () => {
    const user = userEvent.setup();
    const cityTextBox = CitySearchComponent.queryByRole('textbox');
    await user.click(cityTextBox);
    const suggestionList = CitySearchComponent.queryByRole('list');
    expect(suggestionList).toBeInTheDocument();
    expect(suggestionList).toHaveClass('suggestions');
  });

  test('updates list of suggestions correctly when user types in city textbox', async () => {
    const user = userEvent.setup();
    //***allEvents contains the list of all events by calling the asynchronous function, getEvents.
    const allEvents = await getEvents();
    //***allLocations contains the set of all possible distinct locations that will be extracted from allEvents. This extraction is done by using the function extractLocations.
    const allLocations = extractLocations(allEvents);
    //***CitySearch mock component is re-rendered as a way to overwrite the original CitySearchComponent (see beforeAll above), but this time it has a new prop ( allLocations) passed to it.
    CitySearchComponent.rerender(<CitySearch allLocations={allLocations} />);

    //***The process of a user typing “Berlin” in the city input field is simulated.
    const cityTextBox = CitySearchComponent.queryByRole('textbox');
    await user.type(cityTextBox, "Berlin");

    //***allLocations is filtered down to the suggestions array—the array that will only contain locations matching the query typed by the user in the city input field.
    const suggestions = allLocations? allLocations.filter((location) => {
      return location.toUpperCase().indexOf(cityTextBox.value.toUpperCase()) > -1;
    }): [];

    //***get all <li> elements inside the suggestion list.
    //***The number of rendered suggestions is compared to the number of suggestions in the ''state'' of CitySearch, plus one. This is because we manually add a “See all cities” suggestion at the end of the list (this means the minimum length of the <li>s will be 1).
    const suggestionListItems = CitySearchComponent.queryAllByRole('listitem');
    expect(suggestionListItems).toHaveLength(suggestions.length + 1);
    //***The rendered text in each list item is checked (using a for loop) to ensure that it matches the corresponding value on the suggestions array.
    for (let i = 0; i < suggestions.length; i += 1) {
      expect(suggestionListItems[i].textContent).toBe(suggestions[i]);
    }
  });

  test('renders the suggestion text in the textbox upon clicking on the suggestion', async () => {
    const user = userEvent.setup();
    const allEvents = await getEvents(); 
    const allLocations = extractLocations(allEvents);
    CitySearchComponent.rerender(<CitySearch allLocations={allLocations} />);

    const cityTextBox = CitySearchComponent.queryByRole('textbox');
    await user.type(cityTextBox, "Berlin");

    //***The suggestion's textContent look like this: "Berlin, Germany".
    const BerlinGermanySuggestion = CitySearchComponent.queryAllByRole('listitem')[0];

    await user.click(BerlinGermanySuggestion);

    expect(cityTextBox).toHaveValue(BerlinGermanySuggestion.textContent);
  });
});