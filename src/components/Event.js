import React, { useState } from 'react';


//***Props { events } is coming from mock-data.js file.
const Event = ({ event }) => {


  const [showDetails, setShowDetails] = useState(false);


  return (
    <li className="event">
      <h4 id="event-summary">{event.summary}</h4>
      <p>{formatDate(event.created)}</p>
      <p>{event.location}</p>
      {showDetails && (
        <div>
          <h4>About the event</h4>
          <p><a href={event.htmlLink} target="_blank">See details on Google Calendar</a></p>
          <br></br>
          <p id='event-description'>{event.description}</p>
        </div>
      )}
      {/* Button that toggles the 'showDetails' state when clicked. The onClick={() => setShowDetails(!showDetails)} is an event handler that is triggered when the button is clicked. The !showDetails expression toggles the current value of showDetails, switching it from false to true or vice versa.*/}
      <button className="button-details" onClick={() => setShowDetails(!showDetails)}>
        {/* showDetails ? 'Hide details' : 'Show details' dynamically changes the text displayed on the event button based on the value of the showDetails state.*/}
        {showDetails ? 'Hide details' : 'Show details'}
      </button>
    </li>
  );
};


//***Function to format the start time of each event correctly.
export const formatDate = (isoDate) => {
  const options = { weekday: 'long', year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit' };
  const formattedDate = new Date(isoDate).toLocaleDateString('en-US', options);
  return formattedDate;
};


export default Event;