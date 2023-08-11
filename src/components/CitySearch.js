//***src/components/CitySearch.js

//***Import necessary module.
import { useState, useEffect } from "react";

//***''allLocations'' props extraction.
const CitySearch = ({ allLocations, setCurrentCity }) => {
    const [showSuggestions, setShowSuggestions] = useState(false);
    //***New state for the input field so that we can access its value (here being query).
    const [query, setQuery] = useState("");
    //***Local state ''suggestions'' holds the list of suggestions.
    const [suggestions, setSuggestions] = useState([]);

    //***Function handleInputChanged is uses as the callback function in city search input field below, which is why it has the event parameter in it.
    //***This function 1) obtains the current value of the input field. Based on this value, it 2) filters the allLocations array, then 3) set the Query local state to whatever the input value is, and finally 4) set the suggestions local state to the filtered locations array. ${allLocations}  is used instead of {allLocations} to avoid directly putting complex data-type variables into useEffect’s dependency array.
    const handleInputChanged = (event) => {
        const value = event.target.value;
        const filteredLocations = allLocations ? allLocations.filter((location) => {
            return location.toUpperCase().indexOf(value.toUpperCase()) > -1;
        }) : [];
        setQuery(value);
        setSuggestions(filteredLocations);
    };

    //***Function called when a suggestion item is clicked by a user in the city search suggestions list.
    const handleItemClicked = (event) => {
        const value = event.target.textContent;
        setQuery(value);
        setShowSuggestions(false);
        setCurrentCity(value);
      };

    //***Initialize the local state suggestions to have the default value as the same array as its allLocations prop
    //***Stringified value of the allLocation prop is used as a dependency. This way, if there’s a change in it (e.g., an empty array that gets filled), the useEffect code will be re-executed again, ensuring that the local suggestions state is updated.
    useEffect(() => {
        setSuggestions(allLocations);
      }, [`${allLocations}`]);

    return (
        <div id="city-search">
             <h1>Have some free time? </h1>
             <p>Search for events you could participate in your own city or around the world!</p>
            <h4 id="city-search-title">City finder</h4>
            <input
                type="text"
                className="city"
                placeholder="Search for a city"
                value={query}
                onFocus={() => setShowSuggestions(true)}
                onChange={handleInputChanged}
            />
             {/* Conditional rendering checks whether the showSuggestions state is true. If it is, it renders the content inside the braces - otherwise, it renders null. This controls whether the suggestions list should be displayed (when user clicks on input field). */}
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