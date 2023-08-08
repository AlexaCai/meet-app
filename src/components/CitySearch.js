// src/components/CitySearch.js

import { useState } from "react";

//***''allLocations'' props extraction.
const CitySearch = ({ allLocations }) => {
    const [showSuggestions, setShowSuggestions] = useState(false);
    //***New state for the input field so that we can access its value (here being query).
    const [query, setQuery] = useState("");
    //***Local state ''suggestions'' holds the list of suggestions.
    const [suggestions, setSuggestions] = useState([]);

    //***Function handleInputChanged is uses as the callback function of  in city search input field below, which is why it has the event parameter in it.
    //***This function 1) obtains the current value of the input field. Based on this value, it 2) filters the allLocations array, then 3) set the Query local state to whatever the input value is, and finally 4) set the suggestions local state to the filtered locations array.
    const handleInputChanged = (event) => {
        const value = event.target.value;
        const filteredLocations = allLocations ? allLocations.filter((location) => {
            return location.toUpperCase().indexOf(value.toUpperCase()) > -1;
        }) : [];

        setQuery(value);
        setSuggestions(filteredLocations);
    };

    const handleItemClicked = (event) => {
        const value = event.target.textContent;
        setQuery(value);
        setShowSuggestions(false); // to hide the list
    };

    return (
        <div id="city-search">
            <input
                type="text"
                className="city"
                placeholder="Search for a city"
                value={query}
                onFocus={() => setShowSuggestions(true)}
                onChange={handleInputChanged}
            />
            {showSuggestions ?
                <ul className="suggestions">
                    {suggestions.map((suggestion) => {
                        return <li onClick={handleItemClicked} key={suggestion}>{suggestion}</li>
                    })}
                    <li key='See all cities' onClick={handleItemClicked}>
                        <b>See all cities</b>
                    </li>
                </ul>
                : null
            }
        </div>
    )
}

export default CitySearch;