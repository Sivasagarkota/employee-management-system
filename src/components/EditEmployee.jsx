import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import EditEmployeeService from "../services/EditEmployeeService";

export const EditEmployee = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");

  // Fetch employee details on mount
  useEffect(() => {
    EditEmployeeService.getEmployeeById(id)
      .then((response) => {
        setFirstName(response.data.firstName);
        setLastName(response.data.lastName);
        setEmail(response.data.email);
      })
      .catch((err) => console.log(err));
  }, [id]);

  // Handle update/save
  const handleSave = (e) => {
    e.preventDefault();

    const updatedEmployee = { firstName, lastName, email };

    EditEmployeeService.editEmployee(id, updatedEmployee)
      .then(() => {
        alert("Employee updated successfully!");
        navigate("/");
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="fixed inset-0 bg-gray-100 flex flex-col items-center justify-center overflow-auto">
      <div className="w-full max-w-2xl bg-white shadow-xl rounded-none sm:rounded-lg p-8 min-h-screen sm:min-h-fit">
        <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
          Edit Employee
        </h2>

        <form onSubmit={handleSave} className="space-y-6">
          {/* First Name */}
          <div>
            <label className="block text-gray-700 font-medium mb-1">
              First Name
            </label>
            <input
              type="text"
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            />
          </div>

          {/* Last Name */}
          <div>
            <label className="block text-gray-700 font-medium mb-1">
              Last Name
            </label>
            <input
              type="text"
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
            />
          </div>

          {/* Email */}
          <div>
            <label className="block text-gray-700 font-medium mb-1">
              Email
            </label>
            <input
              type="email"
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          {/* Buttons */}
          <div className="flex space-x-4 pt-4">
            <button
              type="submit"
              className="flex-1 bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition duration-300"
            >
              Save
            </button>

            <button
              type="button"
              className="flex-1 bg-red-600 text-white py-3 rounded-lg font-semibold hover:bg-red-700 transition duration-300"
              onClick={() => navigate("/")}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditEmployee;
