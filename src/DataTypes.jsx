import React, { useState, useCallback } from "react";
export const DataTypes = [
  {
    typeName: "Person",
    typeCheckFields: ["firstName", "lastName"],
    icon: "fa fa fa",
    display: ["firstName", "lastName"],
    details: (chosen)=>(
      <div className="DetailDisplay">
        <div className="DetailDisplayContainer">
          {/* <div>User ID: {chosen.userId}</div> */}
          <label for="fname">First name:</label>
          <input type="text" id="fname" name="fname" value={chosen.firstName} />
          <label for="lname">Last name:</label>
          <input type="text" id="lname" name="lname" value={chosen.lastName} />
          <input className="Button" type="submit" value="Submit" />
        </div>
      </div>
    ),
  },
  {
    typeName: "Address",
    typeCheckFields: ["city", "street", "zipcode"],
    icon: "fa fa fa",
    display: ["city", "street", "zipcode"],
    details: (chosen)=>(
        <div className="DetailDisplay">
          <div className="DetailDisplayContainer">
            {/* <div>User ID: {chosen.userId}</div> */}
            <label for="street">Street:</label>
            <input type="text" id="street" name="street" value={chosen.street} />
            <label for="city">City:</label>
            <input type="text" id="city" name="city" value={chosen.city} />
            <label for="state">State:</label>
            <input type="text" id="state" name="state" value={chosen.state} />
            <label for="zipcode">ZipCode:</label>
            <input type="text" id="zipcode" name="zipcode" value={chosen.zipcode} />
            <input className="Button" type="submit" value="Submit" />
          </div>
        </div>
      ),
  },
];

