import React, { useMemo, useState } from "react";
import { Treebeard } from "react-treebeard";
import { DataTypes } from "./DataTypes";
import _ from "lodash";
import { useEffect } from "react";

const TreeExample = (props) => {
  const { json, schema, selected, revertTree, toggleTree, setToggle } = props;
  let isSample = true;
  let fullJson = { ...json };
  if(fullJson.data){
    // console.log("stuff")
    // console.log(fullJson.data.attributes);
    fullJson = fullJson.data.attributes;
    isSample = false;
  }

  // console.log(Object.entries(json.companies[0].departments[0].executive.emailAddress))
  function mapChildren3(json, path, parentType) {
    // console.log("length", Object.entries(json));
    let array = Object.entries(json).map(([key, value]) => {
      // console.log(key);
      // console.log(value);
      let name = "";
      // if (value.firstName && value.lastName) {
      //   name = `${value.firstName} ${value.lastName}`;
      // } else {
      //   name = key;
      // }
      let type;
      let icon;
      let typeDefinition;
      let jobDefinition;
      for (type of DataTypes) {
        if (type.typeCheckFields.every((path) => _.has(value, path))) {
          // console.log("Found");
          // console.log(type.typeName);
          if(type.typeName === "Job"){
            continue
          }
          typeDefinition = type;
          let displayString = type.display.map((x) => value[x]);
          if (type.typeName == "Person") {

            icon = type.icon;
            if (key == "executive") {
              name = key.concat(" ".concat(displayString.join(" ")));
            } else {
              name = displayString.join(" ");
            }
          } else if (type.typeName == "Address") {

            icon = type.icon;
            // name = type.display(
            //   value.street,
            //   value.city,
            //   value.state,
            //   value.zipcode
            // );
            name = displayString.join(", ");
          } else if (
            type.typeName == "Company" ||
            type.typeName == "Department"
          ) {

            icon = type.icon;
            // name = type.display(value.name);
            name = displayString.join(" ");
          }
          // const schemaType = _.get(schema, type.schema.substring(2).replace("/", "."));
          // schemaType.properties.every(())

          // return type.details(chosen);
        }
        // console.log("not found");
      }

      if (name.length == 0) {
        name = key;
      }

      // else{
      //   name = key;
      // }
      if (Array.isArray(value)) {
        // console.log("is Array");
        const newpath = path + `.${name}`;
        let displayName = name;
        if (revertTree[newpath.substring(1)]) {
          // console.log("reverTree");
          // console.log(revertTree);
          // console.log("path ", path.substring(1))
          // const oldName = name;
          displayName = name.concat("*");
          // console.log("edited Name ", displayName);
        }
        let toggleState = true;
        // console.log("new path", newpath)
        // console.log(toggleTree[newpath]);
        if(toggleTree && toggleTree[newpath]!= null){
          // console.log("Toggled!!!!")
          toggleState = toggleTree[newpath];
        }

        return {
          id: newpath,
          name: displayName,
          toggled: toggleState,
          children: mapChildren3(value, newpath, typeDefinition),
        };
      } else if (typeof value === "object"){
        // console.log("is not Array");
        // console.log(Object.entries(value))
        const newpath = path + `.${key}`;
        const checkPath = path + `[${key}]`;

        let displayName = name;
        if (revertTree[checkPath.substring(1)]) {
          // console.log("reverTree");
          // console.log(revertTree);
          // console.log("path ", path.substring(1))
          // const oldName = name;
          displayName = name.concat("*");
          console.log("edited Name ", displayName);
        }
        // if (value && value.firstName && value.lastName) {
        //   // console.log("exist")
        //   name = `${key}: ${value.firstName} ${value.lastName}`;
        // }
        let toggleState = true;
        if(toggleTree && toggleTree[checkPath]){
          toggleState = toggleTree[checkPath];
        }
        // console.log("value")
        // console.log(value)
        if (typeof value === "object")
          return {
            id: path + `[${key}]`,
            name: displayName,
            toggled: toggleState,
            children: mapChildren3(value, newpath, typeDefinition),
            decorators: {
              Header: (props) => {
                return (
                  <div style={props.style} className="nodeContainer">
                    <i class={`${icon}`}></i>
                    {/* <img src="logo.svg" alt="Kiwi standing on oval"></img> */}
                    <div className="nodeName">{props.node.name}</div>
                  </div>
                );
              },
            },
          }
        else {
          return null;
        }
      }
      else if (parentType){

        if (typeof value === "string" && parentType.include.includes(key))
        {
          // console.log(parentType.typeName)
          // console.log("value ", value)
          const newpath = path + `.${key}`;
          let toggleState = true;
          if(toggleTree && toggleTree[newpath]!= null){
            // console.log("Toggled!!!!")
            toggleState = toggleTree[newpath];
          }
          return {
            id: newpath,
            name: `${key}: ${value}`,
            toggled: toggleState,
          }
        }
        else
        return null;
      }
      else if (typeof value === "string" && !isSample){
        const jobDefinition = DataTypes[DataTypes.length-1];
        if (!jobDefinition.includeDetail.includes(key)){
          
          const newpath = path + `.${key}`;
          let toggleState = true;
            if(toggleTree && toggleTree[newpath]!= null){
              // console.log("Toggled!!!!")
              toggleState = toggleTree[newpath];
            }
          if (DataTypes)
          return {
            id: newpath,
            name: `${key}: ${value}`,
            toggled: toggleState,
          }
          else{
            return null;
          }
        }
      }
      else if (typeof value === "string"){
        const newpath = path + `.${key}`;
        let toggleState = true;
        if(toggleTree && toggleTree[newpath]!= null){
          // console.log("Toggled!!!!")
          toggleState = toggleTree[newpath];
        }
          return {
            id: newpath,
            name: `${key}: ${value}`,
            toggled: toggleState,
          }
      }
    });
    return array.filter(function (el) {
      if (el && el.children && el.children.length == 0) {
        delete el.children;
      }
      return el != null;
    });
  }

  // console.log("test3 ", test3);

  // const stuff = {
  //     name: "root",
  //     toggled: true,
  //     children: children,
  //   };
  const [data, setData] = useState(null);
  const [cursor, setCursor] = useState(false);
  const [choose, setSelected] = useState(null);

  useMemo(() => {
    const newData = mapChildren3(fullJson, "", null);
    if(!isSample){
      newData.unshift({
        id: ".job",
        name: `Job`,
        toggled: true,
      })
    }
    else{
      newData.shift();
    }

    setData(newData);
  }, [json, revertTree]);
  const onToggle = (node, toggled) => {
    if (cursor) {
      cursor.active = false;
    }
    node.active = true;
    if (node.children) {
      node.toggled = toggled;
      const newToggleTree = {...toggleTree};
      newToggleTree[node.id] = toggled;
      setToggle(newToggleTree);
    }
    // console.log("node", toggled)
    // console.log(node)
    setCursor(node);
    // console.log("path", node.id);
    if(isSample){

      selected(node.id.substring(1));
    }
    else{
      // console.log(node.id)
      selected("data.attributes".concat(node.id));
    }
    let chosen = _.get(json, node.id.substring(1), "default");
    // console.log(chosen);
    if (chosen && chosen.name) {
      setSelected(chosen.name);
    } else if (chosen && chosen.firstName && chosen.lastName) {
      setSelected(`${chosen.firstName} ${chosen.lastName}`);
    }
    // console.log(choose);
    if (Array.isArray(data)) {
      setData([...data]);
    } else {
      setData({ ...data });
    }
  };

  return (
    <div>
      <Treebeard data={data} onToggle={onToggle} />
      {<div>{selected}</div>}
    </div>
  );
};

export default TreeExample;
