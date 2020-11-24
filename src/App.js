import React, { useState, useCallback } from "react";
import logo from "./logo.svg";
import "./App.css";
import JSONDisplay from "./JSONDisplay";
import sampleData from "./sampleData.json";
import schemaData from "./JSONSchema.json";
import DetailDisplay from "./DetailDisplay";
import TreeBeardComponent from "./TreeBeardComponent";
import SortableTreeComponent from "./SortableTreeComponent";
import JsonUpload from "./JsonUpload";
import { downloadFile } from "./fileDownload";
import { DataTypes } from "./DataTypes";
import swaggerData from "./swagger data.json";
import swaggerSchema from "./swagger schema.json";
import _ from "lodash";

function App() {
  const [selected, setSelected] = useState(null);
  const [json, setJson] = useState(sampleData);
  const [selectedType, setType] = useState(false);
  const [revertTree, setRevertTree] = useState({});
  const [timestamp, setTimestamp] = useState(0);
  const [toggleTree, setToggleTree] = useState({});
  const [clipboard, setClipboard] = useState(null);
  const hiddenFileInput = React.useRef(null);
  // const [schema, setSchema] = useState(schemaData);

  function selectedFile(newFile) {
    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const content = JSON.parse(e.target.result);
        setJson(content);
        setRevertTree({});
        setSelected(null);
        setType(null);
      } catch (err) {
        console.log("failed to load file: ", err);
      }
    };
    reader.readAsText(newFile);
  }

  function handleUpload(){
    hiddenFileInput.current.click();
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
    setTimestamp(timestamp + 1);
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
        if (selectedType.typeName == "Company") {
          base.push(selectedType.blankCompany);
        } else if (selectedType.typeName == "Department") {
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

  function cut(){
    console.log("in cut")
    if (selected) {
      const jsonCopy = { ...json };
      const original = _.get(jsonCopy, selected, "default");
      // const str = selected.substring(0, selected.indexOf("["));
      // console.log(str);
      // const base = _.get(jsonCopy, str, "default");
      // const copy = _.clone(original);
      // const str = selected.substring(0, selected.indexOf("["));
      // // console.log(str);
      // const base = _.get(jsonCopy, str, "default");
      // if (Array.isArray(base)) {
      //   base.push(copy);
      //   setJson(jsonCopy);
      //   const newPath = str + `[${base.length - 1}]`;
      //   console.log("new path ", newPath);
      //   setSelected(newPath);
      // }
      // original.id = base.length+1;
      console.log(original)
      const newClipboard = {
        element: original,
        elementType: selectedType,
        actionType: "cut"
      }
      setClipboard(newClipboard);
      remove();
    }

  }

  function copy() {
    console.log("in copy")
    if (selected) {
      const jsonCopy = { ...json };
      const original = _.get(jsonCopy, selected, "default");
      // const str = selected.substring(0, selected.indexOf("["));
      // console.log(str);
      // const base = _.get(jsonCopy, str, "default");
      // const copy = _.clone(original);
      // const str = selected.substring(0, selected.indexOf("["));
      // // console.log(str);
      // const base = _.get(jsonCopy, str, "default");
      // if (Array.isArray(base)) {
      //   base.push(copy);
      //   setJson(jsonCopy);
      //   const newPath = str + `[${base.length - 1}]`;
      //   console.log("new path ", newPath);
      //   setSelected(newPath);
      // }
      // original.id = base.length+1;
      console.log(original)
      const newClipboard = {
        element: original,
        elementType: selectedType,
        actionType: "copy"
      }
      setClipboard(newClipboard);
    }
  }

  function paste() {
    if (selected && clipboard) {
      console.log("in Paste")
      const target = selected;
      const jsonCopy = { ...json };
      // console.log(target);
      const str = target.substring(0, target.indexOf("["));
      // console.log(str);
      const base = _.get(jsonCopy, str, "default");
      let newElement = clipboard.element;
      if(newElement.userId){
        newElement.userId = base[base.length-1].userId+1;

      }
      else if (newElement.employeeId){
        // base[base.length].employeeId
        newElement.employeeId = base[base.length-1].employeeId+1;
      }

      // console.log(base);
      if (selectedType == clipboard.elementType) {  
        console.log("Match type")
        base.push(newElement)
        const newPath = str + `[${base.length - 1}]`;
        console.log("new path ", newPath);
        setSelected(newPath);
        setJson(jsonCopy);
      }

      if(clipboard.actionType == "cut"){
        setClipboard(null);
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
      {/* <label for="file-upload" className="Button">
        <button className="uploadButton">Upload</button>
      </label> */}
      <input
        id="fileInput"
        type="file"
        name="fileInput"
        ref={hiddenFileInput}
        onChange={(e) => selectedFile(e.target.files[0])}
      />

      {/* <input
        type="fileInput"
        name="fileInput"
        onChange={(e) => selectedFile(e.target.files[0])}
        className="inputfile"
      /> */}
      {/* <label for="fileInput">
        <div className="ButtonInput">Select file to upload</div>
      </label> */}
      <button onClick={handleUpload}>Upload</button>
      <button onClick={download}>Download</button>
      {
        <button
          onClick={addNew}
          disabled={selectedType ? !selectedType.canChange : true}
        >
          Add
        </button>
      }
        {
          <button
            onClick={remove}
            disabled={selectedType ? !selectedType.canChange : true}
          >
            Remove
          </button>
        }
      {
        <button
          onClick={duplicateCurrent}
          disabled={selectedType ? !selectedType.canChange : true}
        >
          Duplicate
        </button>
      }
      {
        <button
          onClick={copy}
          disabled={selectedType ? !selectedType.canChange : true}
        >
          Copy
        </button>
      }
      {
        <button
          onClick={cut}
          disabled={selectedType ? !selectedType.canChange : true}
        >
          Cut
        </button>
      }
      {
        <button
          onClick={paste}
          disabled={clipboard ? false : true}
        >
          Paste
        </button>
      }
      {revertTree[selected] && (
        <button className="button" onClick={revertJson}>
          Undo
        </button>
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
            schema={schemaData}
            toggleTree={toggleTree}
            setToggle={setToggleTree}
          />
        </div>
        <div className="detailContainer">
          {/* <div>{selected}</div> */}
          {selected && (
            <DetailDisplay
              key={timestamp}
              json={json}
              selected={selected}
              updateJson={updateJson}
              setType={setType}
              revertTree={revertTree}
              revert={revertJson}
              schema={schemaData}
            />
          )}
        </div>
      </div>
      {/* <SortableTreeComponent json={sampleData}/> */}
    </div>
  );
}

export default App;
