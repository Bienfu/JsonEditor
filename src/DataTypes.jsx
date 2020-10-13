import React, { useState, useCallback } from "react";
export const DataTypes = [
  {
    typeName: "Person",
    typeCheckFields: ["firstName", "lastName"],
    icon: "fas fa-user",
    display: (key, firstName, lastName) => `${key}: ${firstName} ${lastName} `,
    display2: (firstName, lastName) => `${firstName} ${lastName} `,
    details: (chosen, handleSubmit, onChange) => (
      <div className="DetailDisplay">
        <div className="DetailDisplayContainer">
          {/* <div>User ID: {chosen.userId}</div> */}
          <form onSubmit={handleSubmit}>
            <div className="formFirstName">
              <label for="fname">First name:</label>
              <input
                type="text"
                id="fname"
                name="firstName"
                value={chosen.firstName}
                onChange={onChange}
              />
            </div>
            <div className="formLastName">
              <label for="lname">Last name:</label>
              <input
                type="text"
                id="lname"
                name="lastName"
                value={chosen.lastName}
                onChange={onChange}
              />
            </div>
            <button className="Button" type="submit">
              Submit
            </button>
          </form>
        </div>
      </div>
    ),
    blank: {
      firstName: "firstName",
      lastName: "lastName",
      phoneNumber: "Phone Number",
      emailAddress: "Email Address",
    },
    canChange: true,
  },
  {
    typeName: "Address",
    typeCheckFields: ["city", "street", "zipcode"],
    icon: "fas fa-map-marker-alt",
    display: (street, city, state, zipcode) =>
      `${street}, ${city}, ${state} ${zipcode}`,
    details: (chosen, handleSubmit, onChange) => (
      <div className="DetailDisplay">
        <div className="DetailDisplayContainer">
          {/* <div>User ID: {chosen.userId}</div> */}
          <form onSubmit={handleSubmit}>
            <div className="formStreet">
              <label for="street">Street:</label>
              <input
                type="text"
                id="street"
                name="street"
                value={chosen.street}
                onChange={onChange}
              />
            </div>
            <div className="formCity">
              <label for="city">City:</label>
              <input
                type="text"
                id="city"
                name="city"
                value={chosen.city}
                onChange={onChange}
              />
            </div>
            <div className="formState">
              <label for="state">State:</label>
              <input
                type="text"
                id="state"
                name="state"
                value={chosen.state}
                onChange={onChange}
              />
            </div>
            <div className="formZipcode">
              <label for="zipcode">ZipCode:</label>
              <input
                type="text"
                id="zipcode"
                name="zipcode"
                value={chosen.zipcode}
              />
            </div>
            <button className="Button" type="submit">
              Submit
            </button>
          </form>
        </div>
      </div>
    ),
    blank: {
      street: "street",
      city: "city",
      state: "state",
      zipcode: "zipcode",
    },
    canChange: false,
  },
  {
    typeName: "Name",
    typeCheckFields: ["name"],
    icon: "fas fa-building",
    display: (name) => `${name}`,
    details: (chosen, handleSubmit, onChange) => (
      <div className="DetailDisplay">
        <div className="DetailDisplayContainer">
          {/* <div>User ID: {chosen.userId}</div> */}
          <form onSubmit={handleSubmit}>
            <div className="formName">
              <label for="name">Name:</label>
              <input
                type="text"
                id="name"
                name="name"
                value={chosen.name}
                onChange={onChange}
              />
            </div>
            {/* <label for="lname">Last name:</label>
            <input type="text" id="lname" name="lname" value={chosen.lastName} /> */}
            <button className="Button" type="submit">
              Submit
            </button>
          </form>
        </div>
      </div>
    ),
    blankDepartment: {
      name: "DepartmentName",
      budget: "$???",
      executive: {
        userId: 1,
        firstName: "FirstName",
        lastName: "LastName",
        phoneNumber: "phone number",
        emailAddress: "email address",
      },
      users: [
        {
          userId: 1,
          firstName: "FirstName",
          lastName: "LastName",
          phoneNumber: "phone number",
          emailAddress: "email address",
        },
      ],
      employees: [
        {
          employeeId: 1,
          firstName: "FirstName",
          lastName: "LastName",
          phoneNumber: "phone number",
          emailAddress: "email address",
        },
      ],
    },
    blankCompany: {
      name: "Company Name",
      address: {
        street: "Street name",
        city: "City Name",
        state: "State",
        zipcode: "zipcode",
      },
      departments: [
        {
          name: "Department Name",
          budget: "$??",
          executive: {
            userId: 1,
            firstName: "FirstName",
            lastName: "LastName",
            phoneNumber: "phone number",
            emailAddress: "email address",
          },
          users: [
            {
              userId: 1,
              firstName: "FirstName",
              lastName: "LastName",
              phoneNumber: "phone number",
              emailAddress: "email address",
            },
          ],
          employees: [
            {
              employeeId: 1,
              firstName: "FirstName",
              lastName: "LastName",
              phoneNumber: "phone number",
              emailAddress: "email address",
            },
          ],
        },
      ],
    },
    canChange: true,
  },
];
