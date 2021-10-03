import React, { useEffect, useState } from 'react';
import socketIOClient from 'socket.io-client';
import Chart from 'react-apexcharts';
import './App.css';

const ENDPOINT = ':3001';
const App: React.FC = () => {
  const [count, setCount] = useState<number>(0);
  const [category, setCategory] = useState<number[]>([
    1, 2, 3, 4, 5, 6, 7, 8, 9, 10,
  ]);
  const [element, setElement] = useState<number[]>([
    30, 40, 35, 50, 49, 60, 70, 91, 125, 120,
  ]);
  useEffect(() => {
    const socket = socketIOClient(ENDPOINT);
    socket.on('FromAPI', (data: number) => {
      console.log('🚀 ~ file: App.tsx ~ line 15 ~ socket.on ~ data', data);
      const num = Number(data);
      const year = category.slice(-1)[0] + 1;
      console.log(category.slice(-1)[0] + 1, 'check');
      setCount((prev) => prev + num);
      setCategory([...category, year]);
      setElement([...element, data]);
    });
  }, []);

  const state = {
    options: {
      chart: {
        id: 'realtime',
        animations: {
          enabled: true,
          dynamicAnimation: {
            speed: 1000,
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
          curve: 'smooth',
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
          range: 'XAXISRANGE',
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
      <h1>Hello world</h1>
      <h1>{count}</h1>
      <Chart
        options={state.options}
        series={state.series}
        type="line"
        width={500}
        height={320}
      />
    </div>
  );
};

export default App;
