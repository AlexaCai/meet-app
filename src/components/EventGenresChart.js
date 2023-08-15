import React, { PureComponent } from 'react';
import { useState, useEffect } from 'react';
import { PieChart, Pie, Sector, Cell, ResponsiveContainer } from 'recharts';

const EventsGenreChart = ({ events }) => {

    //***Hold the data to feed the chart.
    const [data, setData] = useState([]);
    //***Event topics that occur in the event 'summaries' and are what will make up the pie slices.
    const genres = ['React', 'JavaScript', 'Node', 'jQuery', 'Angular'];

    //***Call getData() and assign whatever’s returned to the local data state.
    useEffect(() => {
        setData(getData());
        //***useEffect() need to re-executes the callback function whenever the events have been change - this is why we passed ${events} instead of events as is, because it’s an array (complex data type).
    }, [`${events}`]);

    const getData = () => {
        //***Maps the 'genres' array.
        const data = genres.map(genre => {
            //***This get a list of events that include the current genre in their '.summary'.
            const filteredEvents = events.filter((event) => event.summary.includes(genre));
            //***Return an object that has two keys - a 'name' key referring to the current genre in the .map() loop, and a 'value' that will refer to the filteredEvents array length.
            return {
                name: genre,
                value: filteredEvents.length
            };
        })
        //***Return the data array variable constructed from genres.map().
        return data;
    };

    //***Code for labels and stylings
    const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];
    const RADIAN = Math.PI / 180;
    const renderCustomizedLabel = ({ cx, cy, midAngle, outerRadius, percent, index }) => {
        const RADIAN = Math.PI / 180;
        const radius = outerRadius;
        const x = cx + radius * Math.cos(-midAngle * RADIAN) * 1.07;
        const y = cy + radius * Math.sin(-midAngle * RADIAN) * 1.07;
        return percent ? (
          <text
            x={x}
            y={y}
            fill="#8884d8"
            textAnchor={x > cx ? 'start' : 'end'}
            dominantBaseline="central"
          >
            {`${genres[index]} ${(percent * 100).toFixed(0)}%`}
          </text>
        ) : null;
      };

    return (
        <ResponsiveContainer width="99%" height={400}>
          <PieChart>
            <Pie
              data={data}
              dataKey="value"
              fill="#8884d8"
              labelLine={false}
              label={renderCustomizedLabel}
              outerRadius={130}           
            />
          </PieChart>
        </ResponsiveContainer>
      );
}


export default EventsGenreChart;