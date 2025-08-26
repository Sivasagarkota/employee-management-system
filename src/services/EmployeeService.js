import axios from "axios";

const GET_EMPLOYEES_URL = 'http://localhost:8080/api/employees';

class EmployeeService{
    
    getAllEmployees(){
        return axios.get(GET_EMPLOYEES_URL);
    }
}


export default new EmployeeService();

