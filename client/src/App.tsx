import React, { useEffect, useState } from 'react';
import socketIOClient from 'socket.io-client';
import Chart from 'react-apexcharts';
import Graph from './Graph';
import './App.css';

const ENDPOINT = ':3001';
const App: React.FC = () => {
  const [count, setCount] = useState<number>(0);
  const [timing, setTiming] = useState<boolean>(true)
  const [category, setCategory] = useState<number[]>([
    1, 2, 3, 4, 5, 6, 7, 8, 9, 10,
  ]);
  const [element, setElement] = useState<number[]>([
    3, 4, 3, 5, 4, 6, 7, 9, 1, 6,
  ]);
  useEffect(() => {
    const socket = socketIOClient(ENDPOINT);
    socket.on('FromAPI', (data: number) => {
      const year = category.slice(-1)[0] + 1;
      const num = Number(data);
      setCount((prev) => prev + num);
      setCategory([...category, category.push(year)]);
      setElement([...element, element.push(num)]);
    });
  }, [setElement, setCategory]);

  const state = {
    options: {
      chart: {
        id: 'realtime',
        animations: {
          enabled: true,
          dynamicAnimation: {
            speed: 2000,
          },
        },
        toolbar: {
          show: false,
        },
        zoom: {
          enabled: false,
        },
        dataLabels: {
          enabled: false,
        },
        stroke: {
          curve: 'stepline',
        },
        title: {
          text: 'Dynamic Updating Chart',
          align: 'left',
        },
        markers: {
          size: 0,
        },
        xaxis: {
          type: 'datetime',
          range: 10000,
        },
        yaxis: {
          max: 100,
        },
        legend: {
          show: false,
        },
      },
      xaxis: {
        categories: category,
      },
    },
    series: [
      {
        data: element,
      },
    ],
  };

  return (
    <div className="App">
      <h1>{count}</h1>
      <Chart
        options={state.options}
        series={state.series}
        type="line"
        width={500}
        height={200}
      />
      <Graph />
    </div>
  );
};

export default App;
