import React, { useState } from 'react'
import AddEmployeeService from '../services/AddEmployeeService';
import { Navigate, useNavigate } from 'react-router-dom';
import EmployeeList from './EmployeeList';

export const AddEmployee = () => {

  const[firstName, setFirstName] = useState('');
  const[lastName, setLastName] = useState('');
  const[email, setEmail] = useState('');
  
  const navigate = useNavigate();

  return (
    <div className="bg-gray-50 flex justify-center py-10 px-4">

      <form className="bg-white p-6 rounded-2xl shadow-lg w-full max-w-2xl space-y-6 overflow-y-auto">
        <h2 className="text-3xl font-bold text-center text-blue-600">Add Employee</h2>

        <div className="flex flex-col">
          <label className="mb-1 font-medium">First Name</label>
          <input 
            type="text" 
            className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500" 
            placeholder="Enter first name"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />
        </div>

        <div className="flex flex-col">
          <label className="mb-1 font-medium">Last Name</label>
          <input 
            type="text" 
            className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500" 
            placeholder="Enter last name"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />
        </div>

        <div className="flex flex-col">
          <label className="mb-1 font-medium">Email ID</label>
          <input 
            type="email" 
            className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500" 
            placeholder="Enter email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <button 
          type="submit" 
          className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition duration-300"
          onClick={() => {
            if(firstName.trim() != '' && lastName.trim() != '' && email.trim() != ''){
              let newEmployee = {
                "firstName" : firstName,
                "lastName" : lastName,
                "email" : email
              };
              AddEmployeeService.addEmployee(newEmployee)
              .then((response) => {                  
                  setFirstName("");
                  setLastName("");
                  setEmail("");
                  console.log(response);
                })
                .catch((err) => console.log(err));
              
                navigate("/");
            }
            else{
              alert("Please Fill valid Details..");
            }

          }}
        >
          Add Employee
        </button>
        <button className="w-full bg-red-700 text-white py-3 rounded-lg font-semibold hover:bg-red-600 transition duration-300" onClick={() => navigate("/")}>Cancel</button>
      </form>
    </div>
  )
}

export default AddEmployee;
