import React, { useMemo, useState } from "react";
import { Treebeard } from "react-treebeard";

const TreeExample = (props) => {
  const { json } = props;
//   const children = json.users.map((user) => {
//     return {
//       name: `${user.firstName} ${user.lastName}`,
//     };
//   });
//   console.log(Object.keys(json));
console.log("hi")

let test = useMemo(()=>mapChildren(Object.keys(json),json),[json]);

  
function mapChildren(object,json) {
      console.log("object", object);
    return object.map((base) => {
        console.log("base ",base)
        let name =''
        if(base.firstName && base.lastName){
            name= `${base.firstName} ${base.lastName}`;
        }
        else{
            name = base;
        }
        // console.log("base ",json[base])
        //   console.log("infunc ", (Array.isArray(json.base)));
        if(Array.isArray(json[base])){

            return( {
                name: name,
                toggled: true,
                children: mapChildren(json[base],json),
            });
        }
        else{
            return( {
                name: name,
                toggled: true,
            });
        }
    });
}
console.log("test ", test);

// const stuff = {
//     name: "root",
//     toggled: true,
//     children: children,
//   };
  const [data, setData] = useState(test);
  const [cursor, setCursor] = useState(false);

  const onToggle = (node, toggled) => {
    if (cursor) {
      cursor.active = false;
    }
    node.active = true;
    if (node.children) {
      node.toggled = toggled;
    }
    setCursor(node);
    if(Array.isArray(data)){
        setData([...data]);
    }
    else{
        setData({...data});
    }
  };

  return <Treebeard data={data} onToggle={onToggle} />;
};

export default TreeExample;
