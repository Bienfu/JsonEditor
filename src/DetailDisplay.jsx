import React, { useState, useMemo } from "react";
import _ from "lodash";
import { DataTypes } from "./DataTypes";

function DetailDisplay(props) {
  const {
    json,
    selected,
    updateJson,
    setType,
    revertTree,
    revert,
    schema,
  } = props;
  // const chosen = _.get(json, selected, "default");
  // const [type, setType] = useState(selected);
  const [copy, setCopy] = useState();

  // console.log("chosen");
  // console.log(chosen);

  // Object.entries(schema.definitions).map(([key, value]) => {
  //   console.log("key", key);
  //   Object.keys(value.properties).map((key) => {
  //     console.log("value", key);
  //   })
  // })

  const typeDefinition = useMemo(() => {
    const chosen = _.get(json, selected, "default");
    setCopy(chosen);
    if (chosen) {
      for (let type of DataTypes) {
        if (type.typeCheckFields.every((path) => _.has(chosen, path))) {
          console.log("Found");
          console.log(type.typeName);
          // console.log("substring ", type.schema.substring(2).replace("/", "."));
          console.log(
            _.get(schema, type.schema.substring(2).replace("/", "."))
          );
          const schemaType = _.get(
            schema,
            type.schema.substring(2).replace("/", ".")
          );
          console.log(
            "schema has values ",
            type.typeCheckFields.every((path) =>
              _.has(schemaType.properties, path)
            )
          );
          // const schemaType = _.get(schema, type.schema.substring(2).replace("/", "."));
          // Object.entries(schemaType.properties).map(([key, value]) => {
          //   console.log("key value", key, value);
          // })
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

  // const revert = (()=>{
  //   const oldData = revertTree[selected];
  //   updateJson(oldData)
  // });

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

  const createDetails = (
    chosen,
    handleSubmit,
    onChange,
    typeDefinition,
    schemaProps
  ) => {
    return (
      <div className="DetailDisplay">
        <div className="DetailDisplayContainer">
          <form onSubmit={handleSubmit}>
            {Object.entries(schemaProps).map(([key, value]) => {
              console.log(typeDefinition.isEditable);
              console.log(key);
              console.log(typeDefinition.isEditable.includes(key));
              if ((value.type == "string") && typeDefinition.isEditable.includes(key)) {
                return (
                  <div key={key} className={"form" + key}>
                    <label for={key}>{value.title}:</label>
                    <input
                      type="text"
                      id={key}
                      name={key}
                      value={chosen[key]}
                      onChange={onChange}
                    />
                  </div>
                );
              }
              else if((value.type == "string")){
                return (
                  <div key={key} className={"form" + key}>
                    <label for={key}>{value.title}:</label>
                    <div>{chosen[key]}</div>
                  </div>
                );
              }
            })}
            <button className="Button" type="submit">
              Submit
            </button>
          </form>
        </div>
      </div>
    );
  };

  if (copy && typeDefinition) {
    return (
      <div>
        {/* {typeDefinition.details(
          copy,
          handleSubmit,
          onChange,
          _.get(schema, typeDefinition.schema.substring(2).replace("/", "."))
            .properties
        )} */}
        {createDetails(
          copy,
          handleSubmit,
          onChange,
          typeDefinition,
          _.get(schema, typeDefinition.schema.substring(2).replace("/", "."))
            .properties
        )}
        {/* {revertTree[selected] && (
          <button className="button" onClick={revert}>
            Undo
          </button>
        )} */}
      </div>
    );
  }
  setType(null);
  return <div>Data Type Undefined</div>;
}

export default DetailDisplay;
