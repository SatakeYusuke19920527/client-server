import React, { useEffect, useState } from 'react';
import axios from 'axios';
import socketIOClient from 'socket.io-client';
import './App.css';
const ENDPOINT = ':3001';
// const socket = io(':3001');
const App: React.FC = () => {
  const [count, setCount] = useState<number>(0);
  const [status, setStatus] = useState<any>();
  useEffect(() => {
    const socket = socketIOClient(ENDPOINT);
    setStatus(socket);
    socket.on('FromAPI', (data) => {
      setCount((prevCount) => prevCount + 1);
    });
    console.log('=============');
  }, []);
  console.log(status);
  console.log(count);
  const handleClick = async () => {
    const res = await axios.get('http://localhost:3001/users');
    console.log('🚀 ~ file: App.tsx ~ line 11 ~ handleClick ~ res', res.data);
  };
  return (
    <div className="App">
      <h1>Hello world</h1>
      <button onClick={handleClick}>button</button>
      <h1>{count}</h1>
    </div>
  );
};

export default App;
