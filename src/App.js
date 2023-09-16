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
  const [currentNOE, setCurrentNOE] = useState(32);
  const [allLocations, setAllLocations] = useState([]);
  const [currentCity, setCurrentCity] = useState("See all cities");
  const [infoAlert, setInfoAlert] = useState("");
  const [errorAlert, setErrorAlert] = useState("");
  const [warningAlert, setWarningAlert] = useState("");


  useEffect(() => {
    if (navigator.onLine) {
      setWarningAlert("")
    } else {
      setWarningAlert("You are offline. Events list displayed has been loaded from the cache.")
    }
    fetchData();
  }, [currentCity, currentNOE]);


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