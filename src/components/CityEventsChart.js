//***src/components/CityEventsChart.js

import { useState, useEffect } from 'react';
import {
    ScatterChart,
    Scatter,
    XAxis, YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer
} from 'recharts';

const CityEventsChart = ({ allLocations, events }) => {

    //***Hold the data to feed the chart.
    const [data, setData] = useState([]);

    //***Call getData() and assign whatever’s returned to the local data state.
    useEffect(() => {
        setData(getData());
        //***useEffect() need to re-executes the callback function whenever the events have been change - this is why we passed ${events} instead of events as is, because it’s an array (complex data type).
    }, [`${events}`]);

    //***Uses the locations and events saved in the state from the Google Calendar API.
    const getData = () => {
        //***Maps the allLocations array.
        const data = allLocations.map((location) => {
            //***Filters the events by each location to get the length of the resulting array. Uses that length value as the event count for the location.
            const count = events.filter((event) => event.location === location).length
            //***To get the city out of each location in allLocations, the location need to shorten and any unnecessary information need to be remove so we only have a city name. To do this, we use split().
            //***split() the location at the occurrence of a comma followed by a space (", "), which returns an array ("CITY", "COUNTRY"). Then, we refer to the first element in that array with [0], which is the name of the city. The data that’s returned is an array with an object of {city, count} (shorthand of {city: city, count: count}.
            //***((/, | - /))  (meaning '','' OR ''-'' symbol) is present to make sure that cities named with an - (as ex: Dubai - UAE) are splited as well (along with those in the format Toronto, Canada with a separating comma).
            const city = location.split((/, | - /))[0]
            return { city, count };
        })
        return data;
    };

    return (
        <ResponsiveContainer width="99%" height={400}>
            <ScatterChart
                margin={{
                    top: 20,
                    right: 20,
                    bottom: 60,
                    //***Left -30 to eliminate the default space on the chart’s left side (this space is saved for the y-axis labels, but since we haven’t applied labels to this axis, the empty space makes the chart look misaligned).
                    left: -30,
                }}
            >
                <CartesianGrid stroke="#a4a7ab" />
                <XAxis type="category" dataKey="city" name="City" 
                //***Bottom line of code to adjust correctly the chart for smaller screen size.
                //***angle={60}: Tilts the label downwards by 60 degrees. 
                //***interval={0}: Allows all labels to always be rendered no matter how narrow the screen. 
                //***tick={{ dx: 20, dy: 40, fontSize: 14 }}: Property very customizable - can (almost) style the label text however needed.
                angle={60} interval={0} tick={{ dx: 5, dy: 5, fontSize: 14, textAnchor: 'start', transform: 'translate(0, 0)', fill: '#000000' }}/>
                <YAxis type="number" dataKey="count" name="Number of events" allowDecimals={false} tick={{fill: '#000000'}} />
                <Tooltip cursor={{ strokeDasharray: '3 3' }} />
                <Scatter name="City" data={data} fill="#0056b3" />
            </ScatterChart>
        </ResponsiveContainer>
    );
}



export default CityEventsChart;