import React, { useState, useCallback } from "react";
import logo from './logo.svg';
import './App.css';
import JSONDisplay from './JSONDisplay'
import sampleData from './sampleData.json'
import DetailDisplay from './DetailDisplay'

function App() {
  console.log(sampleData);
  const [selected, setSelected] = useState(null);
  return (
    <div className="App">
      {/* <header className="App-header"> */}
        {/* <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a> */}
      {/* </header> */}
        <JSONDisplay json={sampleData} select={setSelected}/>
        {selected && <DetailDisplay selected={selected}/>}
    </div>
  );
}

export default App;
