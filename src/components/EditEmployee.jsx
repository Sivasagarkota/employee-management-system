import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const GET_EMPLOYEE_BY_ID_SERVICE = "http://localhost:8080/employee/find-by";
const UPDATE_EMPLOYEE_BY_ID_SERVICE = "http://localhost:8080/employee/update-by";

function EditEmployee() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [emailId, setEmailId] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchEmployee() {
      try {
        const response = await axios.get(`${GET_EMPLOYEE_BY_ID_SERVICE}/${id}`);
        const emp = response.data;

        setFirstName(emp.firstName);
        setLastName(emp.lastName);
        setEmailId(emp.emailId);
        setLoading(false);
      } catch (error) {
        console.log("Error fetching employee: ", error);
        setLoading(false);
      }
    }
    fetchEmployee();
  }, [id]);

  async function updateEmployee() {
    const updatedEmployee = {
      id,
      firstName,
      lastName,
      emailId,
    };

    try {
      await axios.put(`${UPDATE_EMPLOYEE_BY_ID_SERVICE}/${id}`, updatedEmployee);
      alert("Employee Updated Successfully");
      navigate("/");
    } catch (error) {
      console.error("Update failed: ", error);
    }
  }

  if (loading) {
    return (
      <div className="text-center text-lg font-semibold text-blue-600 mt-8">
        Loading employee data...
      </div>
    );
  }

  return (
    <div className="max-w-lg mx-auto mt-10 p-6 bg-white border rounded-xl shadow-md">
      <h2 className="text-2xl font-bold mb-6 text-center text-gray-700">
        Edit Employee
      </h2>

      <div className="space-y-4">
        <div>
          <label className="text-sm text-gray-600 block mb-1">ID</label>
          <input
            type="text"
            value={id}
            readOnly
            className="w-full px-4 py-2 border rounded-md bg-gray-100 text-gray-500 cursor-not-allowed"
          />
        </div>

        <div>
          <label className="text-sm text-gray-600 block mb-1">First Name</label>
          <input
            type="text"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            className="w-full px-4 py-2 border rounded-md focus:ring focus:ring-blue-300 outline-none"
          />
        </div>

        <div>
          <label className="text-sm text-gray-600 block mb-1">Last Name</label>
          <input
            type="text"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            className="w-full px-4 py-2 border rounded-md focus:ring focus:ring-blue-300 outline-none"
          />
        </div>

        <div>
          <label className="text-sm text-gray-600 block mb-1">Email ID</label>
          <input
            type="email"
            value={emailId}
            onChange={(e) => setEmailId(e.target.value)}
            className="w-full px-4 py-2 border rounded-md focus:ring focus:ring-blue-300 outline-none"
          />
        </div>

        <div className="flex gap-3 mt-4">
          <button
            onClick={updateEmployee}
            className="flex-1 bg-green-600 hover:bg-green-700 text-white py-2 rounded-md font-semibold transition"
          >
            Update
          </button>

          <button
            onClick={() => navigate("/")}
            className="flex-1 bg-gray-500 hover:bg-gray-600 text-white py-2 rounded-md font-semibold transition"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}

export default EditEmployee;
