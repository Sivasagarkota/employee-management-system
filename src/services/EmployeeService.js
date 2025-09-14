import axios from "axios";

const GET_EMPLOYEES_URL = 'http://localhost:8080/api/employees';

const SORT_EMPLOYEES_BY_FIRST_NAME_URL = 'http://localhost:8080/api/employees/filterBy'

class EmployeeService{
    
    getAllEmployees(){
        return axios.get(GET_EMPLOYEES_URL);
    }

    sortById = (e) =>{
        e.preventDefault();
        console.log("sort by id");
    }

    sortByFirstName = (e) =>{
        e.preventDefault();
        console.log("sort by firstname");
    }
    
    sortByLastName = (e) =>{
        e.preventDefault();
        console.log("sort by Lastname");
    }

    sortByEmailId = (e) => {
        e.preventDefault();
        console.log("sort by email");
    }
    
}


export default new EmployeeService();

