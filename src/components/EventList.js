// src/components/EventList.js

import Event from "./Event";

//***Props { events } coming from mock-data.js file (mock-data.js is basically an array of JSON objects retrieved from Google Calendar API, with each object representing one event).
const EventList = ({ events }) => {
 return (
   <ul id="event-list">
     {events ?
       events.map(event => <Event key={event.id} event={event} />) :
       null}
   </ul>
 );
}

export default EventList;
