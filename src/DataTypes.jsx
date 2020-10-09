import React, { useState, useCallback } from "react";
export const DataTypes = [
  {
    typeName: "Person",
    typeCheckFields: ["firstName", "lastName"],
    icon: "fa fa fa",
    display:(key, firstName, lastName) => (`${key}: ${firstName} ${lastName} `),
    display2:(firstName, lastName) => (`${firstName} ${lastName} `),
    details: (chosen, handleSubmit, onChange) => (
      <div className="DetailDisplay">
        <div className="DetailDisplayContainer">
          {/* <div>User ID: {chosen.userId}</div> */}
          <form onSubmit={handleSubmit}>
          <label for="fname">First name:</label>
          <input type="text" id="fname" name="firstName" value={chosen.firstName} onChange={onChange} />
          <label for="lname">Last name:</label>
          <input type="text" id="lname" name="lastName" value={chosen.lastName} onChange={onChange} />
          <button className="Button" type="submit">Submit</button>
          </form>
        </div>
      </div>
    ),
  },
  {
    typeName: "Address",
    typeCheckFields: ["city", "street", "zipcode"],
    icon: "fa fa fa",
    display:(street, city, state, zipcode) => (`${street}, ${city}, ${state} ${zipcode}`),
    details: (chosen, handleSubmit, onChange) => (
      <div className="DetailDisplay">
        <div className="DetailDisplayContainer">
          {/* <div>User ID: {chosen.userId}</div> */}
          <form onSubmit={handleSubmit}>
          <label for="street">Street:</label>
          <input type="text" id="street" name="street" value={chosen.street} onChange={onChange} />
          <label for="city">City:</label>
          <input type="text" id="city" name="city" value={chosen.city} onChange={onChange} />
          <label for="state">State:</label>
          <input type="text" id="state" name="state" value={chosen.state} onChange={onChange} />
          <label for="zipcode">ZipCode:</label>
          <input
            type="text"
            id="zipcode"
            name="zipcode"
            value={chosen.zipcode}
          />
          <button className="Button" type="submit">Submit</button>
          </form>
        </div>
      </div>
    ),
  },
  {
    typeName: "Name",
    typeCheckFields: ["name"],
    icon: "fa fa fa",
    display:(name) => (`${name}`),
    details: (chosen, handleSubmit, onChange) => (
      <div className="DetailDisplay">
        <div className="DetailDisplayContainer">
          {/* <div>User ID: {chosen.userId}</div> */}
          <form onSubmit={handleSubmit}>
          <label for="name">Name:</label>
          <input type="text" id="name" name="name" value={chosen.name} onChange={onChange} />
          {/* <label for="lname">Last name:</label>
            <input type="text" id="lname" name="lname" value={chosen.lastName} /> */}
          <button className="Button" type="submit">Submit</button>
          </form>
        </div>
      </div>
    ),
  },
];
