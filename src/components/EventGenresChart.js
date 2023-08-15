import React, { PureComponent } from 'react';
import { useState, useEffect } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend } from 'recharts';

const EventsGenreChart = ({ events }) => {

  //***Use to look the screen size and make the pie chart legend reponsive based on that.
  const [screenWidth, setScreenWidth] = useState(window.innerWidth || document.documentElement.clientWidth);
  useEffect(() => {
    const handleResize = () => {
      setScreenWidth(window.innerWidth || document.documentElement.clientWidth);
    };
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

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
  const colors = ['#1565C0', '#1E88E5', '#42A5F5', '#90CAF9', '#E3F2FD'];
  const RADIAN = Math.PI / 180;
  const renderCustomizedLabel = ({ cx, cy, midAngle, outerRadius, percent, index }) => {
    const RADIAN = Math.PI / 180;
    const radius = outerRadius;
    const x = cx + radius * Math.cos(-midAngle * RADIAN) * 1.07;
    const y = cy + radius * Math.sin(-midAngle * RADIAN) * 1.07;

    //***Calculate font size based on screen width
    const screenWidth = window.innerWidth || document.documentElement.clientWidth;
    const fontSize = screenWidth > 500 ? 20 : 20;
    //***Adjust vertical position for smaller screens
    const yOffset = screenWidth > 500 ? 0 : 20;

    return percent ? (
      <text
        x={x}
        y={y + yOffset}
        fill="#000000"
        textAnchor={x > cx ? 'start' : 'end'}
        dominantBaseline="central"
        fontSize={`${fontSize}px`} // Use responsive font size
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
          label={screenWidth > 1300 ? renderCustomizedLabel : null}
          outerRadius={130}
          stroke="#000000"
          isAnimationActive={true}
        >
          {
            data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={colors[index]} />
            ))
          }

        </Pie>
        {screenWidth <= 1300 && (
          <Legend
            content={() => (
              <ul
              style={{
                //***Allow items to wrap to multiple lines
                display: 'flex',
                flexWrap: 'wrap', 
                justifyContent: 'center',
                listStyle: 'none',
                padding: 0,
                margin: 0,

              }}
            >
              {data.map((entry, index) => (
                <li
                  key={`item-${index}`}
                  style={{
                    color: 'black',
                    backgroundColor: colors[index],
                    padding: '5px', 
                    margin: '5px', 
                    width: 'auto', 
                    textAlign: 'center',
                  }}
                >
                  {entry.name}
                </li>
                ))}
              </ul>
            )}
          />
        )}
      </PieChart>
    </ResponsiveContainer>
  );
};


export default EventsGenreChart;