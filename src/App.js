import React, { useState, useCallback } from "react";
import logo from "./logo.svg";
import "./App.css";
import JSONDisplay from "./JSONDisplay";
import sampleData from "./sampleData.json";
import sampleData2 from "./sampleData2.json";
import DetailDisplay from "./DetailDisplay";
import TreeBeardComponent from "./TreeBeardComponent";
import SortableTreeComponent from "./SortableTreeComponent";
import JsonUpload from "./JsonUpload";
import {downloadFile} from "./fileDownload";

function App() {
  console.log(sampleData);
  const [selected, setSelected] = useState(null);
  const [json, setJson] = useState(sampleData);

  function selectedFile(newFile) {
    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const content = JSON.parse(e.target.result);
        setJson(content);
      } catch (err) {
        console.log("failed to load file: ", err);
      }
    };
    reader.readAsText(newFile);
  }

  function download(){
    const fileName="myJson.json"
    const data = JSON.stringify(json, null, 2);
    downloadFile(data, fileName, "text/json;charset=utf-8");
  }

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
      <input
        type="file"
        name="file"
        onChange={(e) => selectedFile(e.target.files[0])}
      />
      <button onClick={download}>Download</button>
      <div className="content">
        <div className="treeContainer">
          <TreeBeardComponent
            className="TreeBeard"
            json={json}
            selected={setSelected}
          />
        </div>
        <div className="detailContainer">
          {/* <div>{selected}</div> */}
          {selected && <DetailDisplay json={json} selected={selected} />}
        </div>
      </div>
      {/* <SortableTreeComponent json={sampleData}/> */}
    </div>
  );
}

export default App;
