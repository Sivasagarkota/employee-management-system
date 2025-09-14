import React, { useState } from 'react';
import SearchEmployeeService from '../services/SearchEmployeeService';

const SearchEmployee = () => {
  const [searchFor, setSearchFor] = useState('');
  const [fetchedEmployees, setFetchedEmployees] = useState([]);

  const handleSearch = (e) => {
    e.preventDefault();
    if (!searchFor.trim()) return;

    SearchEmployeeService.findEmployees(searchFor)
      .then((response) => {
        setFetchedEmployees(response.data);
        setSearchFor("");
      })
      .catch((err) => console.error(err));
  };

  return (
    <div>
      <form className="flex items-center" onSubmit={handleSearch}>
        <input
          type="text"
          placeholder="Find By FirstName.."
          className="border border-black p-2 rounded-md text-center"
          value={searchFor}
          onChange={(e) => setSearchFor(e.target.value)}
        />
        <button
          type="submit"
          className="ml-2 bg-[#882614] text-white border border-black p-2 rounded-md hover:bg-white hover:text-[#a5260f] transition duration-300"
        >
          Search
        </button>
      </form>

      <div className="mt-4 w-full">
        {fetchedEmployees.length > 0 &&
          fetchedEmployees.map((emp) => (
            <div
              key={emp.id}
              className="flex justify-between border p-2 mb-2 rounded shadow-sm bg-white"
            >
              <span>{emp.firstName}</span>
              <span>{emp.email}</span>
            </div>
          ))}
      </div>
    </div>
  );
};

export default SearchEmployee;
