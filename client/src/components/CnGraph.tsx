import {useEffect} from 'react'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { useAppDispatch } from '../hooks/useRTK';
import { graph_delete } from '../features/graphSlice'
import { data } from '../data/data';
import socketIOClient from 'socket.io-client';
import axios from 'axios';

import "../styles/CnGraph.css";
const ENDPOINT = 'http://localhost:3001';
const CnGraph = ({ graph }: { graph: number }) => {
  const dispatch = useAppDispatch();
  useEffect(() => {
    const socket = socketIOClient(ENDPOINT);
    socket.on('FromAPI', (data: number) => {
      console.log("🚀 ~ file: Graph.tsx ~ line 14 ~ socket.on ~ data", data)
    });
  }, []);
  const deleteGraph = () => {
    dispatch(graph_delete(graph))
  }
  const handleClick = async () => {
    try {
      const res = await axios.get('http://localhost:3001/v1/users')
      console.log(res.data)
    } catch (error) {
      console.log("🚀 ~ file: FeachData.tsx ~ line 9 ~ handleClick ~ error", error)
    }
  };
  const handleClick2 = async () => {
    try {
      const res = await axios.get('http://localhost:3001/v2/loginUserInfo')
      console.log(res.data)
    } catch (error) {
      console.log("🚀 ~ file: FeachData.tsx ~ line 9 ~ handleClick ~ error", error)
    }
  };
  return (
    <div className="cngraph-wrapper">
      <div className="cngraph-command-area">
        <select name="aurora">
          <option value="aurora">aurora</option>
        </select>
        <select name="STqueue">
          <option value="STqueue">STキュー</option>
        </select>
        <select name="showtime">
          <option value="1hour">1時間</option>
          <option value="1day">1日</option>
          <option value="1week">1週間</option>
          <option value="1year">1年</option>
          <option value="realTime">リアルタイム</option>
        </select>
        <div className="btn-area">
          <button
            onClick={deleteGraph}
          >×</button>
        </div>
      </div>
      <div className="cngraph-graph-area">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            width={500}
            height={300}
            data={data}
            margin={{
              top: 5,
              right: 30,
              left: 20,
              bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="pv" stroke="#8884d8" activeDot={{ r: 8 }} />
            <Line type="monotone" dataKey="uv" stroke="#82ca9d" />
          </LineChart>
        </ResponsiveContainer>
      </div>
      <div>
        <h1>Fetch Data</h1>
        <button
          onClick={handleClick}
        >
          button
        </button>
        <button
          onClick={handleClick2}
        >
          button2
        </button>
      </div>
    </div>
  )
}

export default CnGraph
