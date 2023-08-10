//***src/App.js

//***Import necessary modules and components.
import { useEffect, useState } from 'react';
import EventList from './components/EventList';
import CitySearch from './components/CitySearch';
import NumberOfEvents from './components/NumberofEvents';
import { extractLocations, getEvents } from './api';
import './App.css';

const App = () => {

  const [events, setEvents] = useState([]);
  //***currentNOE (current 'number of events') is the app's global state representing the current number of events. Its default value is 32, which is one of the app’s requirements.
  const [currentNOE, setCurrentNOE] = useState(32);
  //***Creation new state 'allLocations' and passed it to the CitySearch component (see below in return section). 'allLocations' state is initialized in the fetchData() function below, with 'setAllLocations(extractLocations(allEvents));'.
  const [allLocations, setAllLocations] = useState([]);
  const [currentCity, setCurrentCity] = useState("See all cities");


  //***useEffect used for the list of events to be populated as soon as the App component is mounted. To make sure that fetchData() is called whenever there’s a change in the currentCity state, currentCity is used as a dependency in the useEffect() function. This way, the callback of useEffect will be called whenever it detects a change in currentCity. This callback calls fetchData() inside it and will keep the events list up to date.
  useEffect(() => {
    fetchData();
  }, [currentCity, currentNOE]);

  //***Function used to populate the events state with the events list fetched. fetchData() automatically filters out the list of events based on the value of the currentCity state (in the case that it contains a value other than "See all cities"), otherwise, all events will be rendered.
  const fetchData = async () => {
    const allEvents = await getEvents();
    const filteredEvents = currentCity === "See all cities" ?
      allEvents :
      allEvents.filter(event => event.location === currentCity)
    setEvents(filteredEvents.slice(0, currentNOE));
    setAllLocations(extractLocations(allEvents));
  }

 return (
   <div className="App">
     <CitySearch allLocations={allLocations} setCurrentCity={setCurrentCity}/>
     <NumberOfEvents setCurrentNOE={setCurrentNOE}/>
     <EventList events={events}/>
   </div>
 );
}

export default App;