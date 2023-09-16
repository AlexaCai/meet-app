import { useState } from "react";


const NumberOfEvents = ({ setCurrentNOE, setErrorAlert }) => {


    const [inputValue, setInputValue] = useState("32");
    const [placeHolder, setPlaceholder] = useState("Enter number of events");
    

    const handleInputFocus = () => {
        setPlaceholder("Enter number of events");
        setInputValue("");
        if (inputValue !== "" && inputValue !== "32") {
            setPlaceholder("");
            setInputValue(inputValue);
        }
    };


    const handleInputChange = (e) => {
        const value = e.target.value;
        //***Condition to make sure negative number arent allowed (return 0 events).
        if (value.startsWith("-") || value.startsWith("+")) {
            setCurrentNOE(0);
        } else {
            setCurrentNOE(value);
        }
        setPlaceholder("");
        setInputValue(e.target.value);


        let alertErrorText;
        if (value !== "" && ((isNaN(value) || value.startsWith("+") || value <= 0))) {
            alertErrorText = "Please enter a valid number. Letters and special characters are not accepted.";
        }
        else {
            alertErrorText = ""
        }
        setErrorAlert(alertErrorText);
    };
    

    const handleInputBlur = () => {
        if (inputValue === "") {
            setPlaceholder("");
            setInputValue("32");
            setCurrentNOE("32");
            setErrorAlert("");
        }
    };


    return (
        <div id="number-events">
            <h4 id="number-of-events-title">Number of events</h4>
            <p>Enter a number to specify how many events you would like to appear.</p>
            <input
                type="text"
                className="numberEvents"
                value={inputValue}
                placeholder={placeHolder}
                onFocus={handleInputFocus}
                onBlur={handleInputBlur}
                onChange={handleInputChange}
            />
        </div>
    );
};


export default NumberOfEvents; 