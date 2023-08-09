// src/components/EventList.js

//***Import necessary module.
import Event from "./Event";

//***Props { events } coming from mock-data.js file (mock-data.js is basically an array of JSON objects retrieved from Google Calendar API, with each object representing one event).
const EventList = ({ events }) => {
 return (
  //***Creates an unordered list element with the id attribute set to "event-list". This is the container for the list of events.
   <ul id="event-list">
     {/* conditional rendering. It checks if the events prop is truthy (not null or undefined). If events is truthy, it renders the content inside the first set of curly braces; otherwise, it renders null. */}
     {events ?
       events.map(event => <Event key={event.id} event={event} />) :
       null}
   </ul>
 );
}

export default EventList;
