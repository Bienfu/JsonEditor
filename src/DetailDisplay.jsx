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
    if (selected == "data.attributes.job") {
      const chosen = _.get(
        json,
        selected.substring(0, selected.length - 4),
        "default"
      );
      // console.log("chosen")
      // console.log(chosen)
      setCopy(chosen);
      return DataTypes[DataTypes.length - 1];
    }
    const chosen = _.get(json, selected, "default");
    console.log("chosen");
    console.log(chosen);
    setCopy(chosen);
    if (chosen) {
      for (let type of DataTypes) {
        if (type.typeCheckFields.every((path) => _.has(chosen, path))) {
          // console.log("Found");
          // console.log(type.typeName);
          // console.log("substring ", (type.schema.substring(2)).replace(/\//g, "."));
          // console.log(
          //   _.get(type.schemaFile, type.schema.substring(2).replace(/\//g, "."))
          // );
          const schemaType = _.get(
            type.schemaFile,
            type.schema.substring(2).replace(/\//g, ".")
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
          if (type.typeName === "Job") {
            type = null;
          }
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
    // console.log(copy);
    updateJson(copy);
  };

  // const revert = (()=>{
  //   const oldData = revertTree[selected];
  //   updateJson(oldData)
  // });

  const onChange = (evt) => {
    // console.log(evt.target)
    const name = evt.target.name;
    const value = evt.target.value;
    // console.log("value name", value, name)
    setCopy((prevCopy) => {
      let newCopy = { ...prevCopy };
      // console.log(newCopy);
      // console.log(name);
      newCopy[name] = value;
      return newCopy;
    });
  };

  const onChangeSingle = (evt) => {
    // console.log(evt.target)
    const name = evt.target.name;
    const value = evt.target.value;
    // console.log("value name", value, name)
    setCopy((prevCopy) => {
      let newCopy = { ...prevCopy };
      // console.log(newCopy);
      // console.log(name);
      newCopy = value;
      return newCopy;
    });
  };

  const onChangeDropDown = (evt) => {
    console.log(evt.target.value);
    // console.log(evt.target.dataset.name);
    // console.log(copy)
    // const name = evt.target.namestuff;
    // const value = evt.target.value;
    // console.log("value name", value, name)
    const mySubString = selected.substring(
      selected.lastIndexOf("[") + 1,
      selected.lastIndexOf("]")
    );
    // console.log(typeDefinition.schema.concat(".".concat(mySubString)))
    const searchValue = typeDefinition.schema
      .concat(".".concat(mySubString))
      .substring(2)
      .replace(/\//g, ".");
    // console.log(typeDefinition.schemaFile)
    const enumList = _.get(typeDefinition.schemaFile, searchValue, "Basic")
      .enum;

    setCopy((prevCopy) => {
      let newCopy = { ...prevCopy };
      // console.log(newCopy);
      // console.log(name);
      newCopy = enumList[evt.target.value];
      return newCopy;
    });
  };

  const createDetailsDropDown = (chosen, handleSubmit, typeDefinition) => {
    // console.log("drop down");
    // console.log(chosen);
    // console.log(selected);
    const mySubString = selected.substring(
      selected.lastIndexOf("[") + 1,
      selected.lastIndexOf("]")
    );
    // console.log(typeDefinition.schema.concat(".".concat(mySubString)))
    const searchValue = typeDefinition.schema
      .concat(".".concat(mySubString))
      .substring(2)
      .replace(/\//g, ".");
    // console.log(typeDefinition.schemaFile)
    const enumList = _.get(typeDefinition.schemaFile, searchValue, "Basic")
      .enum;
    // console.log(enumList);

    return (
      <div className="DetailDisplay">
        <div className="DetailDisplayContainer">
          <form onSubmit={handleSubmit}>
            <div key={mySubString} className={"form" + mySubString}>
              <select name={mySubString} onChange={onChangeDropDown}>
                {enumList.map((item, index) => {
                  if (item.code == chosen.code)
                  return <option value={index} selected> {item.name} </option>;
                  else
                  return <option value={index}> {item.name} </option>;
                })}
              </select>
            </div>
            {typeDefinition.includeDetail.length > 0 && (
              <button className="Button" type="submit">
                Submit
              </button>
            )}
          </form>
        </div>
      </div>
    );
  };

  const createDetails = (
    chosen,
    handleSubmit,
    onChange,
    typeDefinition,
    schemaProps
  ) => {
    if (typeDefinition.typeName === "BaseState") {
      return createDetailsDropDown(chosen, handleSubmit, typeDefinition);
    }
    return (
      <div className="DetailDisplay">
        <div className="DetailDisplayContainer">
          <form onSubmit={handleSubmit}>
            {Object.entries(typeDefinition.includeDetail).map(
              ([key, value]) => {
                // console.log(typeDefinition.isEditable);
                // console.log(key);
                // console.log("value", value);
                // console.log(typeof value)
                // console.log(typeDefinition.isEditable.includes(value));
                if (
                  typeof value == "string" &&
                  typeDefinition.isEditable.includes(value)
                ) {
                  return (
                    <div key={value} className={"form" + value}>
                      <label for={value}>{value}:</label>
                      <input
                        type="text"
                        id={value}
                        name={value}
                        value={chosen[value]}
                        onChange={onChange}
                      />
                    </div>
                  );
                } else if (typeof value == "string") {
                  return (
                    <div key={value} className={"form" + value}>
                      <label for={value}>{value}:</label>
                      <div>{chosen[value]}</div>
                    </div>
                  );
                }
              }
            )}
            {typeDefinition.includeDetail.length > 0 && (
              <button className="Button" type="submit">
                Submit
              </button>
            )}
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
        {createDetails(copy, handleSubmit, onChange, typeDefinition, "12")}
        {/* {revertTree[selected] && (
          <button className="button" onClick={revert}>
            Undo
          </button>
        )} */}
      </div>
    );
  }
  setType(null);
  if (copy && !Array.isArray(copy)) {
    const array = selected.split(".");
    // console.log(array[array.length - 1]);
    const header = array[array.length - 1];
    console.log("copy");
    console.log(copy);
    console.log(typeof copy);
    return (
      <div className="DetailDisplay">
        <div className="DetailDisplayContainer">
          <form onSubmit={handleSubmit}>
            <div key={header} className={"form" + header}>
              <label for={header}>{header}:</label>
              <input
                type="text"
                id={header}
                name={header}
                value={copy}
                onChange={onChangeSingle}
              />
            </div>
            <button className="Button" type="submit">
              Submit
            </button>
          </form>
        </div>
      </div>
    );
  }
  return <div>Data Type Undefined</div>;
}

export default DetailDisplay;
