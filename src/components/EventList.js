import Event from "./Event";


//***Props { events } coming from mock-data.js file.
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
