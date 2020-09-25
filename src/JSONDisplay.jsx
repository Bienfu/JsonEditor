import React, { useState, useCallback } from "react";

function JSONDisplay(props) {
    const json = props.json;
    const select = props.select;
    const [expanded, setExpanded] = useState(false);
    const listItems = json.users.map((item, index) => (
        <ul key={index} className="UserNode" onClick={() => select(item)}>
              <li>{item.firstName}</li>
        </ul>
      ));
    function toggleNested() {
      const value = expanded;
      setExpanded(!value);
    };
    return (
      <div className="JSONDisplay">
        <div className="JSONDisplayContainer">
          <ul>
          <li onClick={toggleNested}>Users</li>
            {expanded==true && listItems}
          </ul>
        </div>
      </div>
    );
  }
  
  export default JSONDisplay;
  