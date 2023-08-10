//***src/components/NumberOfEvent.js

//***Import necessary module.
import { useState } from "react";

const NumberOfEvents = ({ setCurrentNOE }) => {
    const [inputValue, setInputValue] = useState("32");
    const [placeHolder, setPlaceholder] = useState("Enter number of events");

    const handleInputFocus = () => {
        //***When user click on input field, default value 32 disappear and placeholder messager appears.
        setPlaceholder("Enter number of events");
        setInputValue("");
        //***If input field isnt empty or has number 32, when user clicks on it, the value remains (this is used to make sure if a user enters a number (ex: 12) and then clicks out the input field and click back on it again, his entered number will remains).
        if (inputValue !== "" && inputValue !== "32") {
            setPlaceholder("");
            setInputValue(inputValue);
        }
    };

    const handleInputChange = (e) => {
        const value = e.target.value;
        setPlaceholder("");
        setInputValue(e.target.value);
        setCurrentNOE(value);
    };

    const handleInputBlur = () => {
        if (inputValue === "") {
            setPlaceholder("");
            setInputValue("32");
            setCurrentNOE("32");
        }
    };

    return (
        <div id="number-events">
            <p>Number of events</p>
            <input
                type="text"
                className="numberEvents"
                //***Initial value in the input field is 32, than changed depending on what user types (as defined above with const [inputValue, setInputValue]).
                value={inputValue}
                //***When user click on the input field, initial value of the placeholder is shown (''Enter number of events'', as defined above with const [placeHolder, setPlaceholder]).
                placeholder={placeHolder}
                //***When user clicks on input field, it calls the handleInputFocus function which triggers different changes (see full function above).
                onFocus={handleInputFocus}
                //***When user clicks on input field and than outside of it, it calls the handleInputBlur function which triggers different changes (see full function above).
                onBlur={handleInputBlur}
                //***When user write something in the input field, it calls the handleInputChange function which triggers different changes (see full function above).
                onChange={handleInputChange}
            />
        </div>
    );
};

export default NumberOfEvents; 