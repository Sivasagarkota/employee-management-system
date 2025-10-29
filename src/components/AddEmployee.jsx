import axios from "axios";
import React, { useState } from "react";
import { CREATE_EMPLOYEE_SERVICE } from "../services/CreateEmployeeService";
import { useNavigate } from "react-router";

function AddEmployee() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [emailId, setEmailId] = useState("");

  const navigate = useNavigate();

  async function AddEmployee() {
    if (firstName === "" || lastName === "" || emailId === "") {
      alert("Field values should not be empty");
      return;
    }

    const newEmployee = {
      firstName: firstName,
      lastName: lastName,
      emailId: emailId,
    };

    await axios.post(CREATE_EMPLOYEE_SERVICE, newEmployee);

    navigate("/");
  }

  return (
    <div className="max-w-lg mx-auto mt-10 p-6 bg-white border rounded-xl shadow-lg">
      <h2 className="text-2xl font-bold mb-6 text-center text-gray-700">
        Add Employee
      </h2>

      <div className="space-y-4">
        <input
          type="text"
          placeholder="First Name"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          className="w-full px-4 py-2 border rounded-md outline-none focus:ring focus:ring-blue-300"
        />

        <input
          type="text"
          placeholder="Last Name"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
          className="w-full px-4 py-2 border rounded-md outline-none focus:ring focus:ring-blue-300"
        />

        <input
          type="email"
          placeholder="Email ID"
          value={emailId}
          onChange={(e) => setEmailId(e.target.value)}
          className="w-full px-4 py-2 border rounded-md outline-none focus:ring focus:ring-blue-300"
        />

        <button
          onClick={AddEmployee}
          className="w-full bg-blue-600 hover:bg-blue-700 transition text-white py-2 rounded-md font-semibold"
        >
          Submit
        </button>
        <button
          onClick={() => navigate("/")}
          className="w-full bg-red-600 hover:bg-red-700 transition text-white py-2 rounded-md font-semibold"
        >
          Cancel
        </button>
      </div>
    </div>
  );
}

export default AddEmployee;
