import React, { useMemo, useState } from "react";
import { Treebeard } from "react-treebeard";
import { DataTypes } from "./DataTypes";
import _ from "lodash";
import { useEffect } from "react";

const TreeExample = (props) => {
  const { json, json2, selected } = props;


  // console.log(Object.entries(json.companies[0].departments[0].executive.emailAddress))
  function mapChildren3(json, path) {
    console.log("length", Object.entries(json))
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
      for (type of DataTypes) {
        if (type.typeCheckFields.every((path) => _.has(value, path))) {
          // console.log("Found");
          // console.log(type.typeName);
          if(type.typeName == "Person"){
            if(key == "executive"){
              name = type.display(key, value.firstName, value.lastName);
            }
            else{
              name = type.display2(value.firstName, value.lastName);
            }
          }
          else if(type.typeName == "Address"){
              name = type.display(value.street, value.city, value.state, value.zipcode);
          }
          else if(type.typeName == "Name"){
            name = type.display(value.name);
        }
          // return type.details(chosen);
        }
        // console.log("not found");
      }

      if(name.length == 0){
        name = key;
      }
      // else{
      //   name = key;
      // }
      if (Array.isArray(value)) {
        // console.log("is Array");
        const newpath = path + `.${name}`;
        return {
          id: path + `.${name}`,
          name: name,
          toggled: true,
          children: mapChildren3(value, newpath),
        };
      } else {
        // console.log("is not Array");
        // console.log(Object.entries(value))
        const newpath = path + `.${key}`;
        // if (value && value.firstName && value.lastName) {
        //   // console.log("exist")
        //   name = `${key}: ${value.firstName} ${value.lastName}`;
        // }
        if ((typeof value === 'object'))
          return {
            id: path + `[${key}]`,
            name: name,
            toggled: true,
            children: mapChildren3(value, newpath),
          };
        else {
          return null;
        }
      }
    });
    return array.filter(function (el) {
      if(el && el.children && el.children.length==0){
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
    
    useMemo(() => {const newData = mapChildren3(json, "");setData(newData)}, [json]);
  const onToggle = (node, toggled) => {
    if (cursor) {
      cursor.active = false;
    }
    node.active = true;
    if (node.children) {
      node.toggled = toggled;
    }
    setCursor(node);
    // console.log("path", node.id);
    selected(node.id.substring(1));
    let chosen = _.get(json, node.id.substring(1), "default");
    // console.log(chosen);
    if (chosen && chosen.name) {
      setSelected(chosen.name);
    }
    else if(chosen && chosen.firstName && chosen.lastName){
      setSelected(`${chosen.firstName} ${chosen.lastName}`)
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
