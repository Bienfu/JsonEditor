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
import { downloadFile } from "./fileDownload";
import { DataTypes } from "./DataTypes";
import _ from "lodash";

function App() {
  console.log(sampleData);
  const [selected, setSelected] = useState(null);
  const [json, setJson] = useState(sampleData);
  const [selectedType, setType] = useState(null);
  const [revertTree, setRevertTree] = useState({});

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

  function download() {
    const fileName = "myJson.json";
    const data = JSON.stringify(json, null, 2);
    downloadFile(data, fileName, "text/json;charset=utf-8");
  }

  function updateJson(newBranch) {
    let newJson = { ...json };
    if (revertTree) {
      if (!revertTree[selected]) {
        const newAddition = _.cloneDeep(_.get(json, selected));
        // console.log("newAddition");
        // console.log(newAddition);
        const newRevert = { ...revertTree };
        newRevert[selected] = newAddition;
        setRevertTree(newRevert);
      }
    }
    _.set(newJson, selected, newBranch);
    setJson(newJson);
  }

  function revertJson() {
    const oldData = revertTree[selected];
    updateJson(oldData);
    const newRevert = { ...revertTree };
    newRevert[selected] = null;
    setRevertTree(newRevert);
  }

  function addNew() {
    if (selected) {
      const target = selected;
      const jsonCopy = { ...json };
      // console.log(target);
      const str = target.substring(0, target.indexOf("["));
      // console.log(str);
      const base = _.get(jsonCopy, str, "default");
      // console.log(base);
      if (Array.isArray(base)) {
        console.log("isArray");
        // console.log(Object.keys(base));
        if (str == "companies" && selectedType.typeName == "Name") {
          base.push(selectedType.blankCompany);
        } else if (selectedType.typeName == "Name") {
          base.push(selectedType.blankDepartment);
        } else if (selectedType.typeName == "Person") {
          base.push(selectedType.blank);
        }
        const newPath = str + `[${base.length - 1}]`;
        console.log("new path ", newPath);
        setSelected(newPath);
        setJson(jsonCopy);
      } else {
        console.log("isNotArray");
      }
      // const chosen = _.get(jsonCopy, selected, "default");
      // if (chosen) {
      //   for (let type of DataTypes) {
      //     if (type.typeCheckFields.every((path) => _.has(chosen, path))) {
      //       console.log("Found");
      //       console.log(type.typeName);
      // }
      // console.log("not found");
      // }
      // }
    }
  }

  function duplicateCurrent() {
    if (selected) {
      const jsonCopy = { ...json };
      const original = _.get(jsonCopy, selected, "default");
      const copy = _.clone(original);
      const str = selected.substring(0, selected.indexOf("["));
      // console.log(str);
      const base = _.get(jsonCopy, str, "default");
      if (Array.isArray(base)) {
        base.push(copy);
        setJson(jsonCopy);
        const newPath = str + `[${base.length - 1}]`;
        console.log("new path ", newPath);
        setSelected(newPath);
      }
    }
  }

  function remove() {
    if (selected) {
      const jsonCopy = { ...json };
      const str = selected.substring(0, selected.indexOf("["));
      // console.log(str);
      const base = _.get(jsonCopy, str, "default");
      if (Array.isArray(base)) {
        const mySubString = selected.substring(
          selected.lastIndexOf("[") + 1,
          selected.lastIndexOf("]")
        );
        console.log(mySubString);
        const newBase = _.pullAt(base, mySubString);
        setJson(jsonCopy);
        setSelected(null);
      }
    }
  }

  function handleKeyPress(evt) {
    evt.preventDefault();
    evt.stopPropagation();
    console.log(evt.ctrlKey);
    console.log(evt.key);
    return false;
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
      {selectedType && selectedType.canChange && (
        <button onClick={addNew}>Add {selectedType.typeName}</button>
      )}
      {selectedType && selectedType.canChange && (
        <button onClick={duplicateCurrent}>Duplicate</button>
      )}
      {selectedType && selectedType.canChange && (
        <button onClick={remove}>Remove</button>
      )}
      <div className="content">
        <div
          className="treeContainer"
          onKeyDown={handleKeyPress}
          onKeyPress={handleKeyPress}
          tabIndex={-1}
        >
          <TreeBeardComponent
            className="TreeBeard"
            json={json}
            selected={setSelected}
            revertTree={revertTree}
          />
        </div>
        <div className="detailContainer">
          {/* <div>{selected}</div> */}
          {selected && (
            <DetailDisplay
              json={json}
              selected={selected}
              updateJson={updateJson}
              setType={setType}
              revertTree={revertTree}
              revert={revertJson}
            />
          )}
        </div>
      </div>
      {/* <SortableTreeComponent json={sampleData}/> */}
    </div>
  );
}

export default App;
