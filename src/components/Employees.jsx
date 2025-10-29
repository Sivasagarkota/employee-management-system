import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { DELETE_EMPLOYEE_BY_SERVICE } from "../services/DeleteEmployeeByService";
import { GET_EMPLOYEE_BY_ID_SERVICE } from "../services/GetEmployeeById";
import { FILTER_EMPLOYEE_BY_SERVICE } from "../services/FilterEmployeeByService";
import { PAGINATION_SERVICE } from "../services/paginationService";

function Employees() {

  const [employees, setEmployees] = useState([]);
  const [searchId, setSearchId] = useState("");
  const [loading, setLoading] = useState(false);
  const [filterByName, setFilterByName] = useState("id");

  const [offset, setOffset] = useState(0);
  const [pageSize, setPageSize] = useState(3);

  const navigate = useNavigate();

  useEffect(() => {
    handlePagination();
  }, [offset, pageSize]);

  async function handlePagination() {
    setLoading(true);
    try {
      const res = await axios.get(`${PAGINATION_SERVICE}/${offset}/${pageSize}`);
      setEmployees(res.data);
    } catch (error) {
      console.error("Pagination error:", error);
    }
    setLoading(false);
  }

  function addEmployee() {
    navigate("/create");
  }

  function handleEdit(id) {
    navigate(`/edit/${id}`);
  }

  async function handleDelete(id) {
    try {
      await axios.delete(`${DELETE_EMPLOYEE_BY_SERVICE}/${id}`);
      setEmployees(prev => prev.filter(emp => emp.id !== id));
    } catch (error) {
      console.error("Delete Error:", error);
    }
  }

  async function filterData(filterByName) {
    try {
      const response = await axios.get(
        `${FILTER_EMPLOYEE_BY_SERVICE}?byName=${encodeURIComponent(filterByName)}&byDirection=ASC`
      );
      setEmployees(response.data);
    } catch (error) {
      console.error("Filter Error:", error);
    }
  }

  async function findById(e) {
    const id = e.target.value;
    setSearchId(id);

    if (!id) {
      handlePagination();
      return;
    }

    try {
      const response = await axios.get(`${GET_EMPLOYEE_BY_ID_SERVICE}/${id}`);
      setEmployees([response.data]);
    } catch {
      setEmployees([]);
    }
  }

  return (
    <div className="max-w-6xl mx-auto mt-10 bg-white p-6 rounded-xl shadow-lg">

      {/* Header Buttons */}
      <div className="flex flex-wrap justify-between gap-4 mb-6">

        <button
          onClick={addEmployee}
          className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md"
        >
          Add Employee
        </button>

        {/* Sort */}
        <div className="flex items-center gap-2">
          <label className="text-sm font-medium text-gray-700">Sort By:</label>
          <select
            value={filterByName}
            onChange={(e) => setFilterByName(e.target.value)}
            className="px-3 py-1 border rounded-md"
          >
            <option value="id">ID</option>
            <option value="firstName">First Name</option>
            <option value="lastName">Last Name</option>
            <option value="emailId">Email ID</option>
          </select>
          <button
            onClick={() => filterData(filterByName)}
            className="px-3 py-1 bg-green-600 hover:bg-green-700 text-white rounded-md"
          >
            Sort
          </button>
        </div>

        {/* Search */}
        <div className="flex items-center gap-2">
          <label className="text-sm font-medium">Search ID:</label>
          <input
            type="number"
            value={searchId}
            onChange={findById}
            className="px-3 py-1 border rounded-md"
          />
        </div>

      </div>

      {/* Table */}
      {loading ? (
        <h3 className="text-center text-blue-600 text-lg font-semibold">Loading...</h3>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full border rounded-lg">
            <thead className="bg-gray-200 text-gray-600">
              <tr>
                <th className="py-2 border">ID</th>
                <th className="py-2 border">First Name</th>
                <th className="py-2 border">Last Name</th>
                <th className="py-2 border">Email ID</th>
                <th className="py-2 border" colSpan="2">Actions</th>
              </tr>
            </thead>

            <tbody>
              {employees.length ? (
                employees.map(emp => (
                  <tr key={emp.id} className="text-center hover:bg-gray-50">
                    <td className="py-2 border">{emp.id}</td>
                    <td className="py-2 border">{emp.firstName}</td>
                    <td className="py-2 border">{emp.lastName}</td>
                    <td className="py-2 border">{emp.emailId}</td>

                    <td className="py-2 border">
                      <button
                        onClick={() => handleEdit(emp.id)}
                        className="px-3 py-1 bg-yellow-500 hover:bg-yellow-600 text-white rounded-md"
                      >
                        Edit
                      </button>
                    </td>
                    <td className="py-2 border">
                      <button
                        onClick={() => handleDelete(emp.id)}
                        className="px-3 py-1 bg-red-600 hover:bg-red-700 text-white rounded-md"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6" className="py-3 text-center text-gray-500">
                    No Employees Found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}

      {/* Pagination */}
      <div className="mt-4 flex items-center justify-between">
        <div>
          <select
            onChange={(e) => setPageSize(Number(e.target.value))}
            className="border px-2 py-1 rounded-md"
          >
            <option value="3">3</option>
            <option value="6">6</option>
            <option value="9">9</option>
          </select>
        </div>

        <div className="flex gap-3">
          <button
            className="px-3 py-1 bg-purple-500 hover:bg-purple-700 text-white rounded-md"
            onClick={() => setOffset(Math.max(offset - 1, 0))}
          >
            {"<"}
          </button>

          <button
            className="px-3 py-1 bg-purple-500 hover:bg-purple-700 text-white rounded-md"
            onClick={() => setOffset(offset + 1)}
          >
            {">"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default Employees;
