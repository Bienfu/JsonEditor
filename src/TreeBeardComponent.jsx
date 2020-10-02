import React, { useMemo, useState } from "react";
import { Treebeard } from "react-treebeard";

const TreeExample = (props) => {
  const { json, json2 } = props;
  const _ = require("lodash");
  //   const children = json.users.map((user) => {
  //     return {
  //       name: `${user.firstName} ${user.lastName}`,
  //     };
  //   });
  //   console.log(Object.keys(json));
  console.log("hi");

  // let test = useMemo(() => mapChildren(Object.keys(json),json), [json]);

  // function mapChildren(object, json) {
  //   console.log("object", object);
  //   return object.map((base) => {
  //     console.log("base ", base);
  //     let name = "";
  //     if (base.firstName && base.lastName) {
  //       name = `${base.firstName} ${base.lastName}`;
  //     } else {
  //       name = base;
  //     }
  //     // console.log("base ",json[base])
  //     //   console.log("infunc ", (Array.isArray(json.base)));
  //     if (Array.isArray(json[base])) {
  //       return {
  //         name: name,
  //         toggled: true,
  //         children: mapChildren(json[base], json),
  //       };
  //     } else {
  //       return {
  //         name: name,
  //         toggled: true,
  //       };
  //     }
  //   });
  // }

  // function mapChildren2(json, path) {
  //   // console.log("entries ", Object.entries(json));
  //   // console.log("json ", json);
  //   const newJSON = [];
  //   for (const [key, value] of Object.entries(json)) {
  //     // console.log(`Hi ${key}: ${value}`);
  //     // console.log("value ", value)
  //     let name = "";
  //     if (value.firstName && value.lastName) {
  //       name = `${value.firstName} ${value.lastName}`;
  //     } else {
  //       name = key;
  //     }
  //     if (Array.isArray(value)) {
  //       // console.log("is Array")
  //       const newpath = path + `.${name}`;
  //       newJSON.push({
  //         id: path + `.${name}`,
  //         name: name,
  //         toggled: true,
  //         children: mapChildren2(value, newpath),
  //       });
  //     } else {
  //       // console.log("is not Array")
  //       newJSON.push({
  //         id: path + `[${key}]`,
  //         name: name,
  //         toggled: true,
  //       });
  //     }
  //   }
  //   return newJSON;
  // }

  console.log(Object.entries(json.companies[0].departments[0].executive.emailAddress))
  function mapChildren3(json, path) {
    // console.log("length", Object.entries(json))
    let array = Object.entries(json).map(([key, value]) => {
      // console.log(key);
      // console.log(value);
      let name = "";
      // if (value.firstName && value.lastName) {
      //   name = `${value.firstName} ${value.lastName}`;
      // } else {
      //   name = key;
      // }
      if(value && value.name){
        name = value.name;
      }
      else{
        name = key;
      }
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
        if (value && value.firstName && value.lastName) {
          // console.log("exist")
          name = `${key}: ${value.firstName} ${value.lastName}`;
        }
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

  let test3 = useMemo(() => mapChildren3(json, ""), [json]);

  // console.log("test ", test);
  console.log("test3 ", test3);

  // const stuff = {
  //     name: "root",
  //     toggled: true,
  //     children: children,
  //   };
  const [data, setData] = useState(test3);
  const [cursor, setCursor] = useState(false);
  const [selected, setSelected] = useState(null);

  const onToggle = (node, toggled) => {
    if (cursor) {
      cursor.active = false;
    }
    node.active = true;
    if (node.children) {
      node.toggled = toggled;
    }
    setCursor(node);
    console.log("path", node.id);
    let chosen = _.get(json, node.id.substring(1), "default");
    console.log(chosen);
    if (chosen && chosen.name) {
      setSelected(chosen.name);
    }
    else if(chosen && chosen.firstName && chosen.lastName){
      setSelected(`${chosen.firstName} ${chosen.lastName}`)
    }
    console.log(selected);
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
      <div>hi</div>
    </div>
  );
};

export default TreeExample;
