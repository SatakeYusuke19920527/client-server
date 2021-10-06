import React, { useEffect } from 'react';
import socketIOClient from 'socket.io-client';
import Chart from 'react-apexcharts';
import { useAppSelector, useAppDispatch } from '../app/hooks'
import { selectGraphData, addGraphData } from '../features/graphDataSlice'
const ENDPOINT = ':3001';
const Graph: React.FC = () => {
  const { graphData } = useAppSelector(selectGraphData)
  const dispatch = useAppDispatch()

  useEffect(() => {
    const socket = socketIOClient(ENDPOINT);
    socket.on('FromAPI', (data: number) => {
      let dt = new Date()
      let hour = dt.getHours()
      let minute = dt.getMinutes()
      let second = dt.getSeconds()
      let date = `${hour}:${minute}:${second}`
      dispatch(addGraphData({ x: date, y: Number(data) }))
    });
  }, [dispatch]);

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
        categories: graphData.x,
      },
    },
    series: [
      {
        name: "login user",
        data: graphData.y,
      },
    ],
  };

  return (
    <div>
      <h1>アクティブユーザー数{graphData.y.slice(-1)[0]}</h1>
      <Chart
        options={state.options}
        series={state.series}
        type="line"
        width={500}
        height={200}
      />
    </div>
  );
};

export default Graph;
