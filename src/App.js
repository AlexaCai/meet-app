//***src/App.js

//***Import necessary modules and components.
import { useEffect, useState } from 'react';
import EventList from './components/EventList';
import CitySearch from './components/CitySearch';
import NumberOfEvents from './components/NumberofEvents';
import CityEventsChart from './components/CityEventsChart';
import EventGenresChart from './components/EventGenresChart';
import { extractLocations, getEvents } from './api';
import { InfoAlert, ErrorAlert, WarningAlert } from './components/Alert';
import './App.css';

const App = () => {

  const [events, setEvents] = useState([]);
  //***currentNOE (current 'number of events') is the app's global state representing the current number of events. Its default value is 32, which is one of the app’s requirements.
  const [currentNOE, setCurrentNOE] = useState(32);
  //***Creation new state 'allLocations' and passed it to the CitySearch component (see below in return section). 'allLocations' state is initialized in the fetchData() function below, with 'setAllLocations(extractLocations(allEvents));'.
  const [allLocations, setAllLocations] = useState([]);
  const [currentCity, setCurrentCity] = useState("See all cities");
  //***State created to represent the text that’s displayed in the info alert.
  const [infoAlert, setInfoAlert] = useState("");
  //***State created to represent the text that’s displayed in the error alert.
  const [errorAlert, setErrorAlert] = useState("");
  //***State created to represent the text that’s displayed in the warning alert.
  const [warningAlert, setWarningAlert] = useState("");

  //***useEffect used for the list of events to be populated as soon as the App component is mounted. To make sure that fetchData() is called whenever there’s a change in the currentCity state, currentCity is used as a dependency in the useEffect() function. This way, the callback of useEffect will be called whenever it detects a change in currentCity. This callback calls fetchData() inside it and will keep the events list up to date.
  useEffect(() => {
    if (navigator.onLine) {
      setWarningAlert("")
    } else {
      setWarningAlert("You are offline. Events list displayed has been loaded from the cache.")
    }
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
      <div className="alerts-container">
        <div className="info-alert">
          {/* 'infoText' state is used to pass text to the InfoAlert component, as this is where the logic is. If the infoText state contains text (i.e., infoAlert's length isn’t zero), meaning that we want to show the alert, InfoAlert will render it - otherwise, it will render nothing. */}
          {infoAlert.length ? <InfoAlert text={infoAlert} /> : null}
        </div>
        <div className="error-alert">
          {errorAlert.length ? <ErrorAlert text={errorAlert} /> : null}
        </div>
        <div className="warning-alert">
          {warningAlert.length ? <WarningAlert text={warningAlert} /> : null}
        </div>
      </div>
      <CitySearch
        allLocations={allLocations}
        setCurrentCity={setCurrentCity}
        //***setInfoAlert used here to render the alert - for example, when a user searches for a city and no suggestions are found. The setInfoAlert setter function is passed here to CitySearch to populate the city search input field with a string value (the alert message to be displayed) in case the user searches for a city that doesn’t exist. 
        setInfoAlert={setInfoAlert} />
      <NumberOfEvents
        setCurrentNOE={setCurrentNOE}
        setErrorAlert={setErrorAlert}
      />
      <div className="charts-container">
        <div>
          <div>
            <h3>Events by type</h3>
          </div>
          <div className="pie-chart">
            <EventGenresChart events={events} />
          </div>
        </div>
        <div>
          <h3>Events by city</h3>
          <CityEventsChart
            allLocations={allLocations}
            events={events} />
        </div>
      </div>
      <EventList events={events} />
    </div>
  );
}

export default App;