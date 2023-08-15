//***src/components/CitySearch.js

//***Import necessary module.
import { useState, useEffect } from "react";

//***''allLocations'' props extraction.
const CitySearch = ({ allLocations, setCurrentCity, setInfoAlert }) => {
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

        let infoText;
        //***Once the list of filtered locations is returned after user searched for a city in search input field, it’s checked to see if the list contains no suggestions.
        if (filteredLocations.length === 0) {
            //***If no suggestions are found (length === 0), infoText is set as the message to display in the info alert.
            infoText = "We can not find the city you are looking for. Please try another city."
        } else {
            //***If the list contains some suggestions, infoText is set to be empty, and the alert will stay hidden.
            infoText = ""
        }
        setInfoAlert(infoText);
    };

    //***Function called when a suggestion item is clicked by a user in the city search suggestions list.
    const handleItemClicked = (event) => {
        const value = event.target.textContent;
        setQuery(value);
        setShowSuggestions(false);
        //***To ensure chart and pie visual are getting updated correcly, when user change the city, setCurrentCity is first cleard, then its getting updated with the value selected by the user. This is important because wihtout this process, visuals arent getting updated perfectly.
        setCurrentCity("");
        setTimeout(() => {
            setCurrentCity(value);
        }, 0);
        //***'setInfoAlert("")' used here to make sure that if someone clicks the 'See all cities' option in the suggestion, alert won't show up. 
        setInfoAlert("")
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