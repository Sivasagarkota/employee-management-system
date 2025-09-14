import React, { useState, useEffect } from 'react';
import EmployeeService from '../services/EmployeeService';
import DeleteEmployeeService from '../services/DeleteEmployeeService';
import { useNavigate } from 'react-router-dom';
import SearchEmployee from './SearchEmployee';

export const EmployeeList = () => {

  const [employees, setEmployees] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    EmployeeService.getAllEmployees()
      .then((response) => setEmployees(response.data))
      .catch((error) => console.log(error));
  }, []);

  const handleDelete = (id) => {
    DeleteEmployeeService.deleteEmployee(id)
      .then(() => setEmployees(employees.filter((e) => e.id !== id)))
      .catch((err) => console.log(err));
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-4">
        <SearchEmployee />
        <button
          onClick={() => navigate('/add-employee')}
          className="hover:bg-white border border-black hover:text-[#a5260f] 
                     bg-[#882614] text-white px-4 py-2 rounded-md font-semibold 
                     transition duration-300 ease-in-out"
        >
          Add Employee
        </button>
      </div>

      <h2 className="text-2xl text-[#4b0f04] font-bold mb-6 text-center">Employees List</h2>

      <div className="overflow-x-auto shadow-lg rounded-lg">
        <table className="w-full border-collapse bg-white">
          <thead>
            <tr className="bg-gray-200 text-left text-gray-700 uppercase text-sm">
              <th className="py-3 px-6 border cursor-pointer" onClick={(e) => EmployeeService.sortById(e)}>Employee Id</th>
              <th className="py-3 px-6 border cursor-pointer" onClick={(e) => EmployeeService.sortByFirstName(e)}>First Name</th>
              <th className="py-3 px-6 border cursor-pointer" onClick={(e) => EmployeeService.sortByLastName(e)}>Last Name</th>
              <th className="py-3 px-6 border cursor-pointer" onClick={(e) => EmployeeService.sortByEmailId(e)}>Email</th>
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
                    <button
                      className="bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-4 rounded"
                      onClick={() => navigate(`/edit-employee/${employee.id}`)}
                    >Edit
                    </button>

                    <button
                      className="bg-red-700 hover:bg-red-800 text-white font-semibold py-2 px-4 rounded"
                      onClick={() => handleDelete(employee.id)}
                    >Delete
                    </button>
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
