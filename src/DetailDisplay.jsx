import React, { useState, useMemo } from "react";
import _ from "lodash";
import { DataTypes } from "./DataTypes";

function DetailDisplay(props) {
  const { json, selected, updateJson, setType } = props;
  // const chosen = _.get(json, selected, "default");
  // const [type, setType] = useState(selected);
  const [copy, setCopy] = useState();

  // console.log("chosen");
  // console.log(chosen);

  const typeDefinition = useMemo(() => {
    const chosen = _.get(json, selected, "default");
    setCopy(chosen);
    if (chosen) {
      for (let type of DataTypes) {
        if (type.typeCheckFields.every((path) => _.has(chosen, path))) {
          console.log("Found");
          console.log(type.typeName);
          setType(type);
          return type;
        }
        console.log("not found");
      }
    }
  }, [selected]);

  const handleSubmit = (event) => {
    event.preventDefault();
    // console.log(event.target)
    console.log(copy);
    updateJson(copy);
  };

  const onChange = (evt) => {
    const name = evt.target.name;
    const value = evt.target.value;
    setCopy((prevCopy) => {
      let newCopy = { ...prevCopy };
      console.log(newCopy);
      console.log(name);
      newCopy[name] = value;
      return newCopy;
    });
  };
  if (copy && typeDefinition) {
    return typeDefinition.details(copy, handleSubmit, onChange);
  }

  return <div>Loading...</div>;
}

export default DetailDisplay;
