import React, { useState, useCallback } from "react";
import logo from './logo.svg';
import './App.css';
import JSONDisplay from './JSONDisplay'
import sampleData from './sampleData.json'
import sampleData2 from './sampleData2.json'
import DetailDisplay from './DetailDisplay'
import TreeBeardComponent from './TreeBeardComponent'
import SortableTreeComponent from './SortableTreeComponent'

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
        {/* <JSONDisplay json={sampleData} select={setSelected}/> */}
        {selected && <DetailDisplay json={sampleData} selected={selected}/>}
        <TreeBeardComponent className="TreeBeard" json={sampleData} json2={sampleData2}/>
        <SortableTreeComponent json={sampleData}/>
    </div>
  );
}

export default App;
