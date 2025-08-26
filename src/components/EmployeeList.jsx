import React, { useState, useEffect } from 'react'
import EmployeeService from '../services/EmployeeService'
import { useNavigate } from 'react-router-dom'
import EditEmployeeService from '../services/EditEmployeeService'
import DeleteEmployeeService from '../services/DeleteEmployeeService'

export const EmployeeList = () => {
  const [employees, setEmployees] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    EmployeeService.getAllEmployees()
      .then((response) => {
        setEmployees(response.data);
      })
      .catch((error) => console.log(error));
  }, []);


  return (
    <div className="container mx-auto px-4 py-8">

      <button id='btn-add-employee' 
        className="border border-black text-[#a5260f] hover:bg-[#882614] hover:text-white p-2 rounded-md transition duration-300 ease-in-out"
        onClick={() => navigate('/add-employee')}
      >Add Employee</button>

      <h2 className="text-2xl text-[#4b0f04] font-bold text-[gray-800] mb-6 text-center">Employees List</h2>

      <div className="overflow-x-auto shadow-lg rounded-lg">
        <table className="w-full border-collapse bg-white">
          <thead>
            <tr className="bg-gray-200 text-left text-gray-700 uppercase text-sm">
              <th className="py-3 px-6 border">Employee Id</th>
              <th className="py-3 px-6 border">First Name</th>
              <th className="py-3 px-6 border">Last Name</th>
              <th className="py-3 px-6 border">Email</th>
              <th className="py-3 px-6 border">Options</th>
            </tr>
          </thead>
          <tbody>
            {employees.map((employee) => (
              <tr key={employee.id} className="hover:bg-gray-100 transition duration-200">
                <td className="py-3 px-6 border text-center">{employee.id}</td>
                <td className="py-3 px-6 border">{employee.firstName}</td>
                <td className="py-3 px-6 border">{employee.lastName}</td>
                <td className="py-3 px-6 border">{employee.email}</td>
                <td>  
                  <div className="flex space-x-2">      
                    <div>
                      <button className="bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-4 rounded" 
                              onClick={() => navigate(`/edit-employee/${employee.id}`)}
                      >Edit</button>
                    </div>
                    <div>
                      <button
                        className="bg-red-700 hover:bg-red-800 text-white font-semibold py-2 px-4 rounded"
                        onClick={(e) => {
                          e.preventDefault();
                          DeleteEmployeeService.deleteEmployee(employee.id)
                            .then(() => {
                              setEmployees(employees.filter((e) => e.id !== employee.id));
                            })
                            .catch((err) => console.log(err));
                        }}
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default EmployeeList;

