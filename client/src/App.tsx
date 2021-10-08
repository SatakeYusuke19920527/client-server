import React from 'react';
import './App.css';

import Graph from './components/Graph'
import FeachData from './components/FeachData'

const App: React.FC = () => {
  return (
    <div className="App">
      <Graph />
      <FeachData />
    </div>
  );
};

export default App;
