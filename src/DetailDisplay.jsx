import React, { useState, useCallback } from "react";

function DetailDisplay(props) {
  const selected = props.selected;
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
  return (
    <div className="DetailDisplay">
      <div className="DetailDisplayContainer">
        <div>User ID: {selected.userId}</div>
        <label for="fname">First name:</label>
        <input type="text" id="fname" name="fname" value={selected.firstName} />
        <label for="lname">Last name:</label>
        <input type="text" id="lname" name="lname" value={selected.lastName} />
        <input type="submit" value="Submit" />
      </div>
    </div>
  );
}

export default DetailDisplay;
