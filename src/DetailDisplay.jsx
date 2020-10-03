import React, { useState, useCallback } from "react";
import _ from "lodash";
import { DataTypes } from "./DataTypes";

function DetailDisplay(props) {
  const { json, selected } = props;
  const chosen = _.get(json, selected, "default");
  let type;

  console.log("chosen");
  console.log(chosen);

  for (type of DataTypes) {
    if (type.typeCheckFields.every((path) => _.has(chosen, path))) {
      console.log("Found");
      console.log(type.typeName);
      return type.details(chosen);
    }
    console.log("not found");
  }

  // DataTypes.some(type=>{if(type.typeCheckFields.every((path)=>(_.has(chosen, path)))){
  //   console.log("Found")
  //   console.log(type.typeName);
  //   return (type.details(chosen))
  // }
  // console.log("not found")})
  return <div>Hello, Error</div>;

  //  const selected = json.users[1];
  // const select = props.select;
  // const [expanded, setExpanded] = useState(false);
  // const listItems = json.users.map((item, index) => (
  //     <ul key={index} className="UserNode" onClick={() => select(item)}>
  //           <li>{item.firstName}</li>
  //     </ul>
  //   ));
  // function toggleNested() {
  //   const value = expanded;
  //   setExpanded(!value);
  // };
  // console.log("selected ", selected)
  // console.log(chosen)
  // if (chosen && chosen.name) {
  //   return (
  //     <div className="DetailDisplay">
  //       <div className="DetailDisplayContainer">
  //         {/* <div>User ID: {chosen.userId}</div> */}
  //         <label for="name">Name:</label>
  //         <input type="text" id="name" name="name" value={chosen.name} />
  //         {/* <label for="lname">Last name:</label>
  //         <input type="text" id="lname" name="lname" value={chosen.lastName} /> */}
  //         <input className="Button" type="submit" value="Submit" />
  //       </div>
  //     </div>
  //   );
  // }
  // else if(chosen && chosen.firstName && chosen.lastName){
  //   return (
  //     <div className="DetailDisplay">
  //       <div className="DetailDisplayContainer">
  //         {/* <div>User ID: {chosen.userId}</div> */}
  //         <label for="fname">First name:</label>
  //         <input type="text" id="fname" name="fname" value={chosen.firstName} />
  //         <label for="lname">Last name:</label>
  //         <input type="text" id="lname" name="lname" value={chosen.lastName} />
  //         <input className="Button" type="submit" value="Submit" />
  //       </div>
  //     </div>
  //   );
  // }
  // else if(chosen && chosen.street && chosen.city && chosen.zipcode){
  //   return (
  //     <div className="DetailDisplay">
  //       <div className="DetailDisplayContainer">
  //         {/* <div>User ID: {chosen.userId}</div> */}
  //         <label for="street">Street:</label>
  //         <input type="text" id="street" name="street" value={chosen.street} />
  //         <label for="city">City:</label>
  //         <input type="text" id="city" name="city" value={chosen.city} />
  //         <label for="state">State:</label>
  //         <input type="text" id="state" name="state" value={chosen.state} />
  //         <label for="zipcode">ZipCode:</label>
  //         <input type="text" id="zipcode" name="zipcode" value={chosen.zipcode} />
  //         <input className="Button" type="submit" value="Submit" />
  //       </div>
  //     </div>
  //   );
  // }

  // return (
  //   <div className="DetailDisplay">
  //     <div className="DetailDisplayContainer">
  //       <div>User ID: {selected.userId}</div>
  //       <label for="fname">First name:</label>
  //       <input type="text" id="fname" name="fname" value={selected.firstName} />
  //       <label for="lname">Last name:</label>
  //       <input type="text" id="lname" name="lname" value={selected.lastName} />
  //       <input type="submit" value="Submit" />
  //     </div>
  //   </div>
  // );
}

export default DetailDisplay;
