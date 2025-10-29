export const GET_ALL_EMPLOYEES_URL = "http://localhost:8080/employee/all";


import axios from "axios";

  export const getAllEmployees = async() => {
    try {
      const response = await axios.get(GET_ALL_EMPLOYEES_URL);
      return  response.data;
    } catch (error) {
      console.error("Failed to fetch employees", error);
      throw error;
    }
}



