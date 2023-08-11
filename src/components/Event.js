//***src/components/Event.js

//***Import the necessary modules from the 'react' package to allow variable having states.
import React, { useState } from 'react';

//***Define a functional component called 'Event'.
//***Props { events } is coming from mock-data.js file (mock-data.js is basically an array of JSON objects retrieved from Google Calendar API, with each object representing one event).
const Event = ({ event }) => {

  //***Declare a state variable 'showDetails' and a function 'setShowDetails' to update it. Initial value of 'showDetails' is false.
  const [showDetails, setShowDetails] = useState(false);

  //***Render the component's UI. All event.summary, event.created, etc. comes from the event object structure within mock-data.js.
  return (
    <li className="event">
      {/* Display event summary */}
      <h4 id="event-summary">{event.summary}</h4>
      {/* Display event start time */}
      <p>{formatDate(event.created)}</p>
      {/* Display event location */}
      <p>{event.location}</p>
      {/* Conditionally render the details section based on 'showDetails' state. The contents inside the parentheses following showDetails && are only rendered if the showDetails state is true. */}
      {showDetails && (
        //***Show more information about the event after user click on Show details button.
        <div>
          {/* Display a heading for the details */}
          <h4>About the event</h4>
          {/* Link redirecting to event Google Calendar for more details info */}
          <p><a href={event.htmlLink} target="_blank">See details on Google Calendar</a></p>
          <br></br>
          {/* Display description of the event */}
          <p id='event-description'>{event.description}</p>
        </div>
      )}
      {/* Button that toggles the 'showDetails' state when clicked. The onClick={() => setShowDetails(!showDetails)} is an event handler that is triggered when the button is clicked. It uses an arrow function to call the setShowDetails function, which updates the showDetails state. The !showDetails expression toggles the current value of showDetails, switching it from false to true or vice versa. */}
      <button className="button-details" onClick={() => setShowDetails(!showDetails)}>
        {/* showDetails ? 'Hide details' : 'Show details' dynamically changes the text displayed on the event button based on the value of the showDetails state. If showDetails is true, the text will be 'Hide details' (allowing user to go back to collapsed event view). If showDetails is false (so currently in a collapsed event view), the text will be 'Show details' (allowing the user to open more details on an event). */}
        {showDetails ? 'Hide details' : 'Show details'}
      </button>
    </li>
  );
};

//***Function to format the start time of each event correctly. This const in exported so it can be used inside Event.test.js prop extracting and make the test 'collapsed event has a start time' run succcessfully (otherwise, since the function is defined inside the Event.js component, it wouldnt accessible in Event.test.js file directly).
export const formatDate = (isoDate) => {
  const options = { weekday: 'long', year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit' };
  const formattedDate = new Date(isoDate).toLocaleDateString('en-US', options);
  return formattedDate;
};

export default Event;