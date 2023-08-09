import { useState } from "react";

const NumberOfEvents = () => {
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
    setPlaceholder("");
    setInputValue(e.target.value);
  };

  const handleInputBlur = () => {
    if (inputValue === "") {
      setPlaceholder("");
      setInputValue("32");
    }
  };

  return (
    <div id="number-events">
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